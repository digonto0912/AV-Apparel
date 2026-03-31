const CAMPAIGN_MODELS = [
  {
    groupClass: "n-4-83",
    imgClass: "n-4-84",
    labelClass: "n-4-85",
    name: "Dakota Johnson",
  },
  {
    groupClass: "n-4-86",
    imgClass: "n-4-87",
    labelClass: "n-4-88",
    name: "Raphinha",
  },
  {
    groupClass: "n-4-89",
    imgClass: "n-4-90",
    labelClass: "n-4-91",
    name: "Jung Kook",
  },
];

export default function LiveInSection() {
  return (
    <>
      {/* Half-width heading */}
      <div className="figma-node n-4-79">
        <div className="figma-node n-4-80">Live in Calvin Klein</div>
        <div className="figma-node n-4-81">
          Live like an icon. Shop our latest campaigns.
        </div>
      </div>

      {/* Campaign models grid */}
      <div className="figma-node n-4-82">
        {CAMPAIGN_MODELS.map((model) => (
          <div
            key={model.groupClass}
            className={`figma-node ${model.groupClass}`}
          >
            <div className={`figma-node ${model.imgClass}`}></div>
            <div className={`figma-node ${model.labelClass}`}>{model.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
