import { useState, useEffect, useRef } from "react";
import { useAppStore } from "../store/store";
import { COLORS, DARK_MODE_COLORS } from "../constants/constants";
import { useWindowSize } from "../hooks/useWindowSize";
import { Send, Camera } from "lucide-react";
import PageTitle from "../components/ui/PageTitle";
import profilePict from "../assets/Avatar.png";

type SettingsData = {
  fullName: string;
  email: string;
  address: string;
  occupation: string;
  dateOfBirth: string;
  oldPassword: string;
  newPassword: string;
  currency: string;
  feedback: string;
  profilePicture: string;
};

type MenuTab = "profile" | "general" | "password" | "currency" | "feedback";

const Settings = () => {
  const { isDarkMode } = useAppStore();
  const { width } = useWindowSize();
  const [activeMenu, setActiveMenu] = useState<MenuTab>("profile");
  const [isChanged, setIsChanged] = useState(false);
  const [initialData, setInitialData] = useState<SettingsData>({
    fullName: "John Doe",
    email: "john@example.com",
    address: "",
    occupation: "",
    dateOfBirth: "",
    oldPassword: "",
    newPassword: "",
    currency: "USD",
    feedback: "",
    profilePicture: profilePict,
  });
  const [formData, setFormData] = useState<SettingsData>(initialData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({
          ...prev,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
    setIsChanged(hasChanges);
  }, [formData, initialData]);

  const handleInputChange = (field: keyof SettingsData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    setInitialData(formData);
    setIsChanged(false);
    // Add API call here to save to backend
    console.log("Changes saved:", formData);
  };

  const handleSendFeedback = () => {
    console.log("Feedback sent:", formData.feedback);
    alert("Thank you for your feedback!");
    setFormData((prev) => ({
      ...prev,
      feedback: "",
    }));
  };

  const menuItems: Array<{ key: MenuTab; label: string }> = [
    { key: "profile", label: "Edit Profile" },
    { key: "general", label: "General" },
    { key: "password", label: "Password" },
    { key: "currency", label: "Currency" },
    { key: "feedback", label: "Feedback" },
  ];

  const isMenuActive = (menuKey: MenuTab) => activeMenu === menuKey;
  const isMobile = width < 768;

  return (
    <div
      className="w-full min-h-screen py-6 px-4 md:px-8"
      style={{
        backgroundColor: isMobile
          ? isDarkMode
            ? DARK_MODE_COLORS.darkBlue
            : COLORS.white
          : isDarkMode
            ? DARK_MODE_COLORS.background
            : COLORS.background,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <PageTitle title="Settings" />

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Menu Sidebar */}
          <div
            className={`${
              isMobile
                ? "flex flex-row gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide"
                : "flex flex-col gap-2"
            } md:w-1/4 md:min-w-0 shrink-0 rounded-lg`}
            style={{
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              backgroundColor: isMobile
                ? isDarkMode
                  ? DARK_MODE_COLORS.darkBlue
                  : COLORS.white
                : "transparent",
              padding: isMobile ? "1rem" : "0",
              marginBottom: isMobile ? "1rem" : "0",
              marginLeft: isMobile ? "-1rem" : "0",
              marginRight: isMobile ? "-1rem" : "0",
              marginTop: isMobile ? "-0.5rem" : "0",
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap md:whitespace-normal ${
                  isMenuActive(item.key)
                    ? "text-white"
                    : isDarkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                }`}
                style={{
                  backgroundColor: isMenuActive(item.key)
                    ? isDarkMode
                      ? DARK_MODE_COLORS.blue
                      : COLORS.blue
                    : isDarkMode
                      ? DARK_MODE_COLORS.background
                      : "#f5f5f5",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div
            className="flex-1 p-6 rounded-xl"
            style={{
              backgroundColor: isMobile
                ? isDarkMode
                  ? DARK_MODE_COLORS.background
                  : COLORS.background
                : isDarkMode
                  ? DARK_MODE_COLORS.darkBlue
                  : COLORS.white,
            }}
          >
            {/* Edit Profile */}
            {activeMenu === "profile" && (
              <div className="flex flex-col gap-6">
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: isDarkMode ? COLORS.white : COLORS.black,
                  }}
                >
                  Edit Profile
                </h2>

                {/* Profile Picture Section */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                      style={{
                        border: `3px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-2 rounded-full"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.blue
                          : COLORS.blue,
                      }}
                    >
                      <Camera size={18} color="white" />
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                  <p
                    className="text-sm"
                    style={{
                      color: isDarkMode ? COLORS.grey : COLORS.headerGrey,
                    }}
                  >
                    Click the camera icon to change your profile picture
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveChanges}
                  disabled={!isChanged}
                  className="px-6 py-2 rounded-lg font-semibold transition-all mt-4"
                  style={{
                    backgroundColor: isDarkMode
                      ? DARK_MODE_COLORS.blue
                      : COLORS.blue,
                    color: isChanged
                      ? COLORS.white
                      : isDarkMode
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(255, 255, 255, 0.6)",
                    cursor: isChanged ? "pointer" : "not-allowed",
                    opacity: isChanged ? 1 : 0.6,
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* General */}
            {activeMenu === "general" && (
              <div className="flex flex-col gap-6">
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: isDarkMode ? COLORS.white : COLORS.black,
                  }}
                >
                  General Information
                </h2>

                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) =>
                        handleInputChange("occupation", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveChanges}
                  disabled={!isChanged}
                  className="px-6 py-2 rounded-lg font-semibold transition-all mt-4"
                  style={{
                    backgroundColor: isDarkMode
                      ? DARK_MODE_COLORS.blue
                      : COLORS.blue,
                    color: isChanged
                      ? COLORS.white
                      : isDarkMode
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(255, 255, 255, 0.6)",
                    cursor: isChanged ? "pointer" : "not-allowed",
                    opacity: isChanged ? 1 : 0.6,
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* Password */}
            {activeMenu === "password" && (
              <div className="flex flex-col gap-6">
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: isDarkMode ? COLORS.white : COLORS.black,
                  }}
                >
                  Change Password
                </h2>

                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      Old Password
                    </label>
                    <input
                      type="password"
                      value={formData.oldPassword}
                      onChange={(e) =>
                        handleInputChange("oldPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        handleInputChange("newPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveChanges}
                  disabled={!isChanged}
                  className="px-6 py-2 rounded-lg font-semibold transition-all mt-4"
                  style={{
                    backgroundColor: isDarkMode
                      ? DARK_MODE_COLORS.blue
                      : COLORS.blue,
                    color: isChanged
                      ? COLORS.white
                      : isDarkMode
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(255, 255, 255, 0.6)",
                    cursor: isChanged ? "pointer" : "not-allowed",
                    opacity: isChanged ? 1 : 0.6,
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* Currency */}
            {activeMenu === "currency" && (
              <div className="flex flex-col gap-6">
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: isDarkMode ? COLORS.white : COLORS.black,
                  }}
                >
                  Currency Settings
                </h2>

                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      Choose Your Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) =>
                        handleInputChange("currency", e.target.value)
                      }
                      className="w-full px-4 py-2 rounded-lg focus:outline-none"
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="XAF">XAF - Central African Franc</option>
                      <option value="XOF">XOF - West African Franc</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="CHF">CHF - Swiss Franc</option>
                      <option value="INR">INR - Indian Rupee</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSaveChanges}
                  disabled={!isChanged}
                  className="px-6 py-2 rounded-lg font-semibold transition-all mt-4"
                  style={{
                    backgroundColor: isDarkMode
                      ? DARK_MODE_COLORS.blue
                      : COLORS.blue,
                    color: isChanged
                      ? COLORS.white
                      : isDarkMode
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(255, 255, 255, 0.6)",
                    cursor: isChanged ? "pointer" : "not-allowed",
                    opacity: isChanged ? 1 : 0.6,
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* Feedback */}
            {activeMenu === "feedback" && (
              <div className="flex flex-col gap-6">
                <h2
                  className="text-2xl font-bold"
                  style={{
                    color: isDarkMode ? COLORS.white : COLORS.black,
                  }}
                >
                  Send Feedback
                </h2>

                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{
                        color: isDarkMode ? COLORS.white : COLORS.black,
                      }}
                    >
                      Your Feedback
                    </label>
                    <textarea
                      value={formData.feedback}
                      onChange={(e) =>
                        handleInputChange("feedback", e.target.value)
                      }
                      placeholder="Tell us what you think..."
                      className="w-full px-4 py-2 rounded-lg focus:outline-none resize-none"
                      rows={6}
                      style={{
                        backgroundColor: isDarkMode
                          ? DARK_MODE_COLORS.background
                          : COLORS.background,
                        color: isDarkMode ? COLORS.white : COLORS.black,
                        border: `1px solid ${
                          isDarkMode ? DARK_MODE_COLORS.blue : COLORS.blue
                        }`,
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendFeedback}
                  disabled={!formData.feedback.trim()}
                  className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all mt-4"
                  style={{
                    backgroundColor: isDarkMode
                      ? DARK_MODE_COLORS.blue
                      : COLORS.blue,
                    color:
                      formData.feedback.trim() === ""
                        ? isDarkMode
                          ? "rgba(255, 255, 255, 0.5)"
                          : "rgba(255, 255, 255, 0.6)"
                        : COLORS.white,
                    cursor:
                      formData.feedback.trim() === ""
                        ? "not-allowed"
                        : "pointer",
                    opacity: formData.feedback.trim() === "" ? 0.6 : 1,
                  }}
                >
                  Send
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-13"></div>
    </div>
  );
};

export default Settings;
