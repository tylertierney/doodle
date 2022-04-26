const PaperSVG: React.FC = () => {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      style={{ position: "absolute", zIndex: -1 }}
    >
      <g transform="matrix(1.152677, 0, 0, 1.152677, -37.459064, -17.282427)">
        <rect
          style={{
            stroke: "rgba(0, 0, 0, 0.7)",
            fill: "var(--offWhite)",
            strokeWidth: "2px",
          }}
          transform="matrix(0.997564, 0.069756, -0.069756, 0.997564, -1.178663, -32.171173)"
          x="70.038"
          y="54.501"
          width="391.406"
          height="390.153"
          rx="5"
          ry="5"
        />
        <rect
          style={{
            stroke: "rgba(0, 0, 0, 0.7)",
            fill: "rgb(252, 252, 252)",
            strokeWidth: "2px",
          }}
          x="47.959"
          y="35.441"
          width="391.406"
          height="390.153"
          rx="5"
          ry="5"
        />
      </g>
    </svg>
  );
};

export default PaperSVG;
