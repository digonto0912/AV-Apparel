const CATEGORY_TABS = [
  {
    headingClass: "n-4-104",
    titleClass: "n-4-105",
    title: "New Arrivals",
    womenLinkClass: "n-4-106",
    womenTextClass: "n-4-107",
    menLinkClass: "n-4-108",
    menTextClass: "n-4-109",
  },
  {
    headingClass: "n-4-110",
    titleClass: "n-4-111",
    title: "Underwear",
    womenLinkClass: "n-4-112",
    womenTextClass: "n-4-113",
    menLinkClass: "n-4-114",
    menTextClass: "n-4-115",
  },
  {
    headingClass: "n-4-116",
    titleClass: "n-4-117",
    title: "Tops",
    womenLinkClass: "n-4-118",
    womenTextClass: "n-4-119",
    menLinkClass: "n-4-120",
    menTextClass: "n-4-121",
  },
  {
    headingClass: "n-4-122",
    titleClass: "n-4-123",
    title: "Bottoms",
    womenLinkClass: "n-4-124",
    womenTextClass: "n-4-125",
    menLinkClass: "n-4-126",
    menTextClass: "n-4-127",
  },
];

export default function NewArrivalsSection() {
  return (
    <div className="figma-node n-4-102">
      <div className="figma-node n-4-103">
        {CATEGORY_TABS.map((tab) => (
          <div
            key={tab.headingClass}
            className={`figma-node ${tab.headingClass}`}
          >
            <div className={`figma-node ${tab.titleClass}`}>{tab.title}</div>
            <div className={`figma-node ${tab.womenLinkClass}`}>
              <div className={`figma-node ${tab.womenTextClass}`}>Women</div>
            </div>
            <div className={`figma-node ${tab.menLinkClass}`}>
              <div className={`figma-node ${tab.menTextClass}`}>Men</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
