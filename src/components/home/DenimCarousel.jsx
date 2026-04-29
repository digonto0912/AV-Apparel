const DENIM_STYLES = [
  {
    id: "8:16",
    imgClass: "n-8-17",
    labelClass: "n-8-18",
    label: "Baggy",
  },
  {
    id: "8:19",
    imgClass: "n-8-20",
    labelClass: "n-8-21",
    label: "90s Straight",
  },
  {
    id: "8:22",
    imgClass: "n-8-23",
    labelClass: "n-8-24",
    label: "90s Tapered",
  },
  {
    id: "8:25",
    imgClass: "n-8-26",
    labelClass: "n-8-27",
    label: "501 Original",
  },
  {
    id: "8:28",
    imgClass: "n-8-29",
    labelClass: "n-8-30",
    label: "Slim",
  },
  {
    id: "8:31",
    imgClass: "n-8-32",
    labelClass: "n-8-33",
    label: "Straight",
  },
  {
    id: "8:34",
    imgClass: "n-8-35",
    labelClass: "n-8-36",
    label: "Skinny",
  },
  {
    id: "8:37",
    imgClass: "n-8-38 n-8-37",
    labelClass: "n-8-39",
    label: "Shop all Denim",
  },
];

export default function DenimCarousel() {
  return (
    <div className="figma-node n-8-15">
      {DENIM_STYLES.map((item) => (
        <div
          key={item.id}
          className={`figma-node n-${item.id.replace(":", "-")}`}
        >
          <div className={`figma-node ${item.imgClass}`}></div>
          <div className={`figma-node ${item.labelClass}`}>{item.label}</div>
        </div>
      ))}
      <div className="figma-node n-8-40"></div>
      <div className="figma-node n-8-41"></div>
      <div className="figma-node n-8-42">
        <img className="figma-img" alt="" src="/assets/svg_8-42.svg" />
      </div>
    </div>
  );
}
