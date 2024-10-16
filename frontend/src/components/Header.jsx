import NavBar from "./NavBar";

export default function Header() {
  return (
    <div>
      <div className="logo">
        <div className="logoImage">
          <img src="/cheese_blob_1.svg" />
        </div>
        <div className="logoHeading">
          <h1>lofc</h1>
        </div>
      </div>
      <div className="navbar">
        <NavBar />
      </div>
    </div>
  );
}
