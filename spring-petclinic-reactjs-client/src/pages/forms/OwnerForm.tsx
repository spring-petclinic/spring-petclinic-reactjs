import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { OwnerFormSchema } from "@models/form/OwnerFormSchema";
import { EOwnerForm } from "@models/form/EOwnerForm";

const yupResolverSchema = yup
  .object()
  .shape({
    [EOwnerForm.FIRST_NAME]: yup.string().required()
  })
  .required();

export default function OwnerForm() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<OwnerFormSchema>({
    resolver: yupResolver(yupResolverSchema)
  });

  const onSubmit: SubmitHandler<OwnerFormSchema> = (data: OwnerFormSchema, e) => {
    e?.preventDefault();
  };

  return (
    <div className="container xd-container">
      <h2>New Owner</h2>
      <form id="add-owner-form" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group has-feedback">
          <div className="form-group ">
            <label className="col-sm-2 control-label">First Name</label>

            <Controller
              control={control}
              name={EOwnerForm.FIRST_NAME}
              render={({ field }) => (
                <div className="col-sm-10">
                  <input id="firstName" className="form-control" type="text" {...field} />
                  {errors?.[EOwnerForm.FIRST_NAME] && (
                    <>
                      <span className="fa fa-remove form-control-feedback" aria-hidden="true" />
                      <span className="help-inline ms-1">must not be empty</span>
                    </>
                  )}
                </div>
              )}
            />
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Last Name</label>

            <div className="col-sm-10">
              <input id="lastName" name="lastName" className="form-control" type="text" value="" />
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Address</label>

            <div className="col-sm-10">
              <input id="address" name="address" className="form-control" type="text" value="" />
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">City</label>

            <div className="col-sm-10">
              <input id="city" name="city" className="form-control" type="text" value="" />
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Telephone</label>

            <div className="col-sm-10">
              <input id="telephone" name="telephone" className="form-control" type="text" value="" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-primary" type="submit">
              Add Owner
            </button>
          </div>
        </div>
      </form>

      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <img src="/resources/images/spring-pivotal-logo.png" alt="Sponsored by Pivotal" />
          </div>
        </div>
      </div>
    </div>
  );
}
