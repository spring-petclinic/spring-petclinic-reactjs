import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OwnerFormSchema } from "@models/form/OwnerFormSchema";
import { EOwnerForm } from "@models/enums/EOwnerForm";
import { PHONE_NUMBER } from "@constants/regexp";
import { REQUIRED_INPUT } from "@constants/messages";
import { FormError } from "@components/FormError";
import { Loading, useCreate, useGetOne, useUpdate } from "react-admin";
import { OWNERS } from "@constants/resources";
import * as Routes from "@constants/routes";
import { IApiOwner } from "@models/api/IApiOwner";
import { useEffect } from "react";

const yupSchema = yup
  .object()
  .shape({
    [EOwnerForm.FIRST_NAME]: yup.string().required(REQUIRED_INPUT),
    [EOwnerForm.LAST_NAME]: yup.string().required(REQUIRED_INPUT),
    [EOwnerForm.ADDRESS]: yup.string().required(REQUIRED_INPUT),
    [EOwnerForm.CITY]: yup.string().required(REQUIRED_INPUT),
    [EOwnerForm.TELEPHONE]: yup.string().required(REQUIRED_INPUT).matches(PHONE_NUMBER, "must have at least 8 numbers")
  })
  .required();

/**
 * This component represents 2 scenarios: "Add new owner" and "Edit existing owner".
 * @constructor
 */
export default function OwnerForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm<OwnerFormSchema>({
    resolver: yupResolver(yupSchema),
    mode: "onSubmit"
  });

  const { id } = useParams();
  const ownerId = id ? Number(id) : undefined;

  const { data: ownerData } = useGetOne<IApiOwner>(OWNERS, { id: ownerId });

  useEffect(() => {
    if (ownerData) {
      const { firstName, lastName, city, telephone, address } = ownerData;
      reset({
        [EOwnerForm.FIRST_NAME]: firstName,
        [EOwnerForm.LAST_NAME]: lastName,
        [EOwnerForm.ADDRESS]: address,
        [EOwnerForm.CITY]: city,
        [EOwnerForm.TELEPHONE]: telephone
      });
    }
  }, [ownerData]);

  const [create, { isSuccess: addSuccess, isPending: addPending }] = useCreate<IApiOwner>();
  const [edit, { isSuccess: editSuccess, isPending: editPending }] = useUpdate();

  const isEdit = !!ownerId;

  const onSubmit: SubmitHandler<OwnerFormSchema> = async (data, e) => {
    e?.preventDefault();
    if (!isEdit) {
      await create(OWNERS, { data });
      return;
    }

    await edit(OWNERS, { id: ownerId, data });
  };

  if (addPending || editPending) {
    return <Loading />;
  }

  if (addSuccess) {
    return <Navigate to={Routes.OWNERS_FIND} />;
  } else if (editSuccess) {
    return <Navigate to={`${Routes.OWNERS}/${ownerId}`} />;
  }

  return (
    <div className="container xd-container">
      <h2>{isEdit ? "Edit" : "New"} Owner</h2>
      <form id="add-owner-form" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group has-feedback">
          <div className="form-group ">
            <label className="col-sm-2 control-label">First Name</label>
            <div className="col-sm-10">
              <input id="firstName" className="form-control" type="text" {...register(EOwnerForm.FIRST_NAME)} />
              {errors?.[EOwnerForm.FIRST_NAME] && <FormError message={errors?.[EOwnerForm.FIRST_NAME]?.message} />}
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Last Name</label>

            <div className="col-sm-10">
              <input id="lastName" className="form-control" type="text" {...register(EOwnerForm.LAST_NAME)} />
              {errors?.[EOwnerForm.LAST_NAME] && <FormError message={errors?.[EOwnerForm.LAST_NAME]?.message} />}
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Address</label>

            <div className="col-sm-10">
              <input id="address" className="form-control" type="text" {...register(EOwnerForm.ADDRESS)} />
              {errors?.[EOwnerForm.ADDRESS] && <FormError message={errors?.[EOwnerForm.ADDRESS]?.message} />}
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">City</label>

            <div className="col-sm-10">
              <input id="city" className="form-control" type="text" {...register(EOwnerForm.CITY)} />
              {errors?.[EOwnerForm.CITY] && <FormError message={errors?.[EOwnerForm.CITY]?.message} />}
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Telephone</label>

            <div className="col-sm-10">
              <input id="telephone" className="form-control" type="text" {...register(EOwnerForm.TELEPHONE)} />
              {errors?.[EOwnerForm.TELEPHONE] && <FormError message={errors?.[EOwnerForm.TELEPHONE]?.message} />}
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-primary" type="submit">
              {isEdit ? "Update" : "Add"} Owner
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
