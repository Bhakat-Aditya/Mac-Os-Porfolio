import { navIcons, navLinks } from "#constants";
import React from "react";
import dayjs from "dayjs";

function Navbar() {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Aditya's Portfolio</p>

        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
            {
                navIcons.map((item) => (
                    <li key={item.id}>
                        <img src={item.img} className="icon-hover" alt={`icon-${item.id}`} />
                    </li>
                ))
            }
        </ul>
        <time>{dayjs().format("ddd D MMM h:mm A")}</time>
      </div>
    </nav>
  );
}

export default Navbar;
