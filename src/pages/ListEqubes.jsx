import { useTranslation } from "react-i18next"


export default function ListEqubes() {
  const [t] = useTranslation("global")

  return (
    <div className="flex min-h-screen w-full flex-col">
            <h1>{t("coming.message")}</h1>
    </div>
  )
}
