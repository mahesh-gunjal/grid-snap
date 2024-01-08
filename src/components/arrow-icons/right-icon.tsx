import { ArrowRightFromLine } from "lucide-react"
import { SPAN_TYPE } from "../gallery"

const RightIcon = ({ index, handleColspan, rotateIcon, title, className = "", span }: { index: number, handleColspan: (index: number, spanType: SPAN_TYPE.LEFT | SPAN_TYPE.RIGHT | boolean) => void, rotateIcon: boolean, title: string, className: string, span: boolean | SPAN_TYPE }) => {
    return (
        <div title={title}>
            <ArrowRightFromLine
                size={24}
                color="#FFF"
                className={`cursor-pointer ${!rotateIcon && "rotate-180"} ${className}`}
                onClick={() => {
                    handleColspan(index, span)
                }}
            />
        </div>
    )
}

export default RightIcon;