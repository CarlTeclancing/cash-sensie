import { COLORS } from "../constants/constants";
import { useAppStore } from "../store/store";

type props = {
  isOn: boolean;
  text: string;
};

const ProgressComponent = ({ isOn, text }: props) => {
  const { changeRegisterPage, completedPagesRegister, updateCompletedPagesRegister } = useAppStore();
  return (
    <div className="w-1/4">
      <div className="flex items-center justify-center">
        <div
          className="w-11/12 h-1.5"
          style={{
            backgroundColor: `${isOn ? COLORS.green : COLORS.grey}`,
          }}
        ></div>
        <div
          className="w-14 h-9 rounded-lg flex items-center justify-center text-white text-lg"
          style={{
            backgroundColor: `${isOn ? COLORS.green : COLORS.grey}`,
          }}
          onClick={() => {
            if (parseInt(text) > (completedPagesRegister || 0)) return;
            updateCompletedPagesRegister && updateCompletedPagesRegister(parseInt(text) - 1);
            changeRegisterPage && changeRegisterPage(parseInt(text));
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ProgressComponent;
