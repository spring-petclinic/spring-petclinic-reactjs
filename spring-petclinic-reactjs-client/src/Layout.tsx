import { CheckForApplicationUpdate, LayoutProps } from "react-admin";
import NavigationBar from "./NavigationBar";

export const Layout = ({ children }: LayoutProps) => (
  <>
    <NavigationBar />
    <div className="container-fluid">{children}</div>
    <CheckForApplicationUpdate />
  </>
);
