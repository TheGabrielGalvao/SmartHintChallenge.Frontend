import { SubmitHandler, useForm } from "react-hook-form"
import { CustomerModel } from "../../../models/Customer.model"


export const CustomerForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CustomerModel>()

    const onSubmit: SubmitHandler<CustomerModel> = (data) => console.log(data)


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input {...register("email")} placeholder="Email do Cliente" />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("name", { required: true })} placeholder="Nome do Cliente" />
            {/* errors will return when field validation fails  */}
            {errors.name && <span>This field is required</span>}

            <input type="submit" />
        </form>
    )
}