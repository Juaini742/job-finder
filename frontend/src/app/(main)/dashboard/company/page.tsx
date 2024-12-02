import CompantForm from "./company-form";

export default function page() {
  return (
    <div className="">
      <h2 className="text-center text-3xl my-5">Company Profile</h2>
      <CompantForm type="create" />
    </div>
  );
}
