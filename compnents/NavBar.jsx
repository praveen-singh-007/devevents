// import Image from "next/image";

const NavBar = () => {
  return (
   <header>
<nav>
  <a className="logo" href="/">
    <img
      alt="logo"
      loading="lazy"
      width={24}
      height={24}
      style={{ color: "transparent" }}
      src="/icons/logo.png"
    />

    <p>DevEvent</p>
  </a>

  <ul>
    <a href="/">Home</a>
    <a href="/">Events</a>
    <a href="/">Create Event</a>
  </ul>
</nav>
</header>

  );
}

export default NavBar;
