import { REQUIRED_INPUT } from "@constants/messages";

export type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  return (
    <>
      <span className="fa fa-remove form-control-feedback" aria-hidden="true" />
      <span className="help-inline ms-1">{message ?? REQUIRED_INPUT}</span>
    </>
  );
}
