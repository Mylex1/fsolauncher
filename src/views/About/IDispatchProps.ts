import IHeader from "../../lib/interfaces/components/IHeader";

// fsolauncher
// \src\views\About\IDispatchProps.ts

export default interface IDispatchProps {
   updateHeader: (header: IHeader) => void;
}
