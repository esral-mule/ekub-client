import { useTranslation } from "react-i18next";

export default function Support() {
    const { t} = useTranslation("global");

    return (
    <div>
        <p>Support</p>
        <p>{t("coming.message")}</p>
    </div>
  )
}
