import { useTranslation } from "react-i18next";
import Transition from "../components/Transition";
const HomePage = ()=> {
  const [t,i18n] = useTranslation("global")
  return (
    <Transition>
      <h1>{t("coming.message")}</h1>
    </Transition>
  );
};


export default HomePage;