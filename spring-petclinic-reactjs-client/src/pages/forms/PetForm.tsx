import "flatpickr/dist/themes/light.css";
import { useEffect } from "react";
import { Loading, useDataProvider, useGetList, useGetOne } from "react-admin";
import { OWNERS, PET_TYPES } from "@constants/resources";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import Flatpickr from "react-flatpickr";
import { REQUIRED_INPUT } from "@constants/messages";
import { EPetForm } from "@models/enums/EPetForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PetFormSchema } from "@models/form/PetFormSchema";
import { IApiOwner } from "@models/api/IApiOwner";
import { formatOwnerFullName } from "../../utils/businessUtils";
import * as Routes from "@constants/routes";
import { OWNERS as ROUTE_OWNERS } from "@constants/routes";
import { FormError } from "@components/FormError";
import { IApiPetType } from "@models/api/IApiPetType";
import { OwnersDataProvider } from "@models/api/OwnersDataProvider";

const yupSchema = yup
  .object()
  .shape({
    [EPetForm.NAME]: yup.string().required(REQUIRED_INPUT),
    [EPetForm.BIRTH_DATE]: yup.date().required(REQUIRED_INPUT),
    [EPetForm.PET_TYPE]: yup.number().required(REQUIRED_INPUT)
  })
  .required();

/**
 * This component represents 2 scenarios: "Add new pet" and "Edit existing pet".
 * @constructor
 */
export default function PetForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    reset,
    watch
  } = useForm<PetFormSchema>({
    resolver: yupResolver(yupSchema),
    mode: "onSubmit"
  });

  const { id: ownerIdParam, petId: petIdParam } = useParams();

  const ownerId = ownerIdParam ? Number(ownerIdParam) : 0;
  const petId = petIdParam ? Number(petIdParam) : 0;

  const isEdit = !!petId;

  const { data: owner, isPending: ownerPending } = useGetOne<IApiOwner>(OWNERS, { id: ownerId });
  const { data: petTypes, isPending: petTypesPending } = useGetList<IApiPetType>(PET_TYPES);

  const dataProvider = useDataProvider<OwnersDataProvider>();

  useEffect(() => {
    const getPetAsync = async () => {
      const {
        data: { name, birthDate, type }
      } = await dataProvider.getPet(OWNERS, { id: ownerId, meta: { petId } });
      const petTypeId = type.id;
      reset({ [EPetForm.NAME]: name, [EPetForm.BIRTH_DATE]: new Date(birthDate), [EPetForm.PET_TYPE]: petTypeId });
    };

    if (isEdit) {
      getPetAsync();
    }
  }, [isEdit]);

  const navigate = useNavigate();

  if (ownerPending || petTypesPending) {
    return <Loading />;
  }

  if (!owner || !petTypes) {
    return <Navigate to={`${ROUTE_OWNERS}/${ownerId}`} />;
  }

  const onSubmit: SubmitHandler<PetFormSchema> = async (data, e) => {
    e?.preventDefault();

    const petType = petTypes.find((p) => p.id === data[EPetForm.PET_TYPE]);

    if (!petType) throw new Error("unable to find pet with ID " + data[EPetForm.PET_TYPE]);

    if (!isEdit) {
      await dataProvider.createPet(OWNERS, { meta: { ownerId }, data: { ...data, type: petType } });
    } else {
      await dataProvider.editPet(OWNERS, {
        meta: { ownerId },
        data: { ...data, type: petType, petId }
      });
    }

    navigate(`${Routes.OWNERS}/${ownerId}`);
  };

  return (
    <div className="container xd-container">
      <h2>New Pet</h2>
      <form id="pet" className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group has-feedback">
          <div className="form-group">
            <label className="col-sm-2 control-label">Owner</label>
            <div className="col-sm-10">{formatOwnerFullName(owner)}</div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Name</label>

            <div className="col-sm-10">
              <input id="name" className="form-control" type="text" {...register(EPetForm.NAME)} />
              {errors?.[EPetForm.NAME] && <FormError message={errors?.[EPetForm.NAME]?.message} />}
            </div>
          </div>

          <div className="form-group ">
            <label className="col-sm-2 control-label">Birth Date</label>

            <div className="col-sm-10">
              <Flatpickr
                id="birthDate"
                className="form-control flatpickr-input"
                type="date"
                readOnly
                {...register(EPetForm.BIRTH_DATE)}
                value={watch(EPetForm.BIRTH_DATE)}
                onChange={([date]) => {
                  setValue(EPetForm.BIRTH_DATE, date);
                  // register(EPetForm.BIRTH_DATE).onChange({ target: { value: date } });
                }}
              />
              {errors?.[EPetForm.BIRTH_DATE] && <FormError message={errors?.[EPetForm.BIRTH_DATE]?.message} />}
            </div>
          </div>

          <div className="control-group">
            <div className="form-group ">
              <label className="col-sm-2 control-label">Type </label>

              <div className="col-sm-10">
                <select id="type" className="form-control" size={petTypes.length} {...register(EPetForm.PET_TYPE)}>
                  {petTypes.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                  ))}
                </select>
                {errors?.[EPetForm.PET_TYPE] && <FormError message={errors?.[EPetForm.PET_TYPE]?.message} />}
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-primary" type="submit">
              Add Pet
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
