import { WindowControls } from "#components";
import { gallery, photosLinks } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { Mail, Search } from "lucide-react";
import React from "react";

function Photo() {
  const { openWindow } = useWindowStore();
  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>
      
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, title, icon }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                // Changed to onDoubleClick
                onDoubleClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
              >
                {/* Added style to ensure whole photo is shown (no cropping) */}
                <img 
                    src={img} 
                    alt={`Gallery image ${id}`} 
                    loading="lazy" 
                    style={{ objectFit: "contain" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const PhotosWindow = WindowWrapper(Photo, "photos");
PhotosWindow.displayName = "Photos";
export default PhotosWindow;