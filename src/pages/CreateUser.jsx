import Transition from "../components/Transition";
import { useTranslation } from "react-i18next"
const CreateUser = () => {
  const [t] = useTranslation("global")

  return (
    <Transition>
      <div>
        <h1>User Create</h1>
        <h1>{t("coming.message")}</h1>
      </div>
    </Transition>
  );
};

export default CreateUser;
