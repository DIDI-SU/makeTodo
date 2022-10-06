import Form from "../Form/Form";
import Btn from "../Btn/Btn";
const BTN_DATA = [
  { id: "makeTodo", className: "m-1", type: "submit", title: "Enter" },
  { id: "checkAll", className: "m-1", type: "button", title: "All" },
  { id: "filterCheck", className: "m-1", type: "button", title: "Filter" },
];
const Header = () => {
  return (
    <header className="flex items-center justify-between mx-auto max-w-3xl p-5 border-b-2 border-b-[#9ca3af]">
      <div className="flex items-center justify-evenly w-4/5">
        <h2 className="text-3xl font-bold text-[#3D4451]">ToDo :</h2>
        <Form />
      </div>
      <div id="btn-box" className="flex items-center justify-evenly">
        {BTN_DATA?.map((data) => (
          <Btn children={data} />
        ))}
      </div>
    </header>
  );
};

export default Header;
