import CSS from "csstype";

interface KadoodleKSVGProps {
  style: CSS.Properties;
}

const KadoodleKSVG: React.FC<KadoodleKSVGProps> = (style) => {
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...style}>
      <text
        style={{
          fill: "white",
          fontFamily: "Carter One",
          fontSize: "452px",
          whiteSpace: "pre",
        }}
        x="100.718"
        y="370.158"
      >
        k
      </text>

      <path
        d="M 390.452 425.662 C 390.452 440.327 327.049 452.215 248.838 452.215 C 170.626 452.215 107.223 440.327 107.223 425.662 C 107.223 410.996 170.626 399.108 248.838 399.108 C 327.049 399.108 390.452 410.996 390.452 425.662 Z"
        // style="fill: none; stroke-width: 4px; stroke: rgb(255, 255, 255);"
        style={{ fill: "none", strokeWidth: "4px", stroke: "white" }}
      />
      <path
        d="M 426.274 437.007 C 426.274 451.673 362.871 463.56 284.66 463.56 C 206.448 463.56 143.045 451.673 143.045 437.007 C 143.045 422.341 206.448 410.454 284.66 410.454 C 362.871 410.454 426.274 422.341 426.274 437.007 Z"
        // style="fill: none; stroke-width: 4px; stroke: rgb(255, 255, 255);"
        style={{ fill: "none", strokeWidth: "4px", stroke: "white" }}
      />
      <path
        d="M 356.955 443.833 C 356.955 458.499 293.552 470.387 215.34 470.387 C 137.129 470.387 73.726 458.499 73.726 443.833 C 73.726 429.168 137.129 417.28 215.34 417.28 C 293.552 417.28 356.955 429.168 356.955 443.833 Z"
        // style="fill: none; stroke-width: 4px; stroke: rgb(255, 255, 255);"
        style={{ fill: "none", strokeWidth: "4px", stroke: "white" }}
      />
    </svg>
  );
};

export default KadoodleKSVG;
