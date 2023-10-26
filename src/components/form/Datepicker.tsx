import { Control, Controller } from "react-hook-form"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import formatDate from "../../helpers/formatDate";


interface DatepickerProps {
    control: Control
    name: string
    isRequired?: boolean
    placeholder: string
    label: string
}

const Datepicker = (props: DatepickerProps) => {
    const { control, name, isRequired = false, placeholder, label } = props
    return <Controller
        name={name}
        rules={{
            required: isRequired === true && "Tanggal harus diisi !"
        }}
        control={control}
        defaultValue={new Date()}
        render={({ field: { onChange, value }, fieldState: { error } }) =>
            <div className="flex flex-col gap-1">
                <label htmlFor={name}>{label}</label>
                <div className="flex gap-2 items-center border-2 border-slate-400 rounded-lg px-4">
                    <FaCalendar />
                    <DatePicker
                        id={name}
                        wrapperClassName="w-full h-full outline-none"
                        className="w-full h-full outline-none p-3 rounded-lg"
                        placeholderText={placeholder}
                        onChange={onChange}
                        selected={new Date(value)}
                        value={formatDate(value, 'id-ID')}
                        maxDate={new Date()}
                        maxTime={new Date()}
                        showTimeInput={true}
                        showFullMonthYearPicker={true}
                        locale={'id'}
                    />
                </div>

                <span className="text-red-500">
                    {error?.message}
                </span>
            </div>
        }
    />
}

export default Datepicker