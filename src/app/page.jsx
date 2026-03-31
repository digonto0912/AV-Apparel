import FigmaScaler from "@/components/FigmaScaler";

export const metadata = {
  title: "AV Apparel  Homepage",
};

export default function HomePage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `html,
body {
  margin: 0;
  padding: 0;
  background: #ffffff;
}
.figma-node {
  position: absolute;
}
.figma-img {
  width: 100%;
  height: 100%;
  display: block;
}
.n-4-2 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 9869px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-3 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 9698.28px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-4 {
  position: absolute;
  left: 0px;
  top: 171px;
  width: 1920px;
  height: 8993.97px;
  box-sizing: border-box;
}
.n-8-2 {
  position: absolute;
  left: 0px;
  top: -171px;
  width: 1920px;
  height: 1384.14px;
  box-sizing: border-box;
}
.n-8-3 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 960px;
  box-sizing: border-box;
}
.n-8-4 {
    position: absolute;
    left: -0.95px;
    top: 0px;
    width: 1921.91px;
    height: 1081.06px;
    box-sizing: border-box;
    background-image: url(/assets/img_8-4_6ededc.png);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0 -990px;
}
.n-8-5 {
  position: absolute;
  left: 40.92px;
  top: 350.2px;
  width: 1838.34px;
  height: 258px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 188.60000610351562px;
  line-height: 1.0689289479283728em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-6 {
  position: absolute;
  left: 40px;
  top: 893px;
  width: 139.98px;
  height: 21px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-8-7 {
  position: absolute;
  left: 199.78px;
  top: 893px;
  width: 62.55px;
  height: 21px;
  color: #999999;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-8-8 {
  position: absolute;
  left: 282.13px;
  top: 896px;
  width: 34.01px;
  height: 16px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-8-9 {
  position: absolute;
  left: 1860px;
  top: 900px;
  width: 20px;
  height: 20px;
  overflow: hidden;
  background: transparent;
}
.n-8-15 {
  position: absolute;
  left: 0px;
  top: 960px;
  width: 1920px;
  height: 424.14px;
  box-sizing: border-box;
}
.n-8-16 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
}
.n-8-17 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-17_1ad6ee.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-18 {
  position: absolute;
  left: 90.5px;
  top: 175.06px;
  width: 114.58px;
  height: 44px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 38.900001525878906px;
  line-height: 1.1311053540892082em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-19 {
  position: absolute;
  left: 295.38px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
}
.n-8-20 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-20_1ad6ee.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-21 {
  position: absolute;
  left: 82.35px;
  top: 149.06px;
  width: 130.85px;
  height: 95px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 35.79999923706055px;
  line-height: 1.229050305522094em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-22 {
  position: absolute;
  left: 590.75px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
}
.n-8-23 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-23_1ad6ee.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-24 {
  position: absolute;
  left: 74.5px;
  top: 149.06px;
  width: 146.58px;
  height: 95px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 38.400001525878906px;
  line-height: 1.1458332878020092em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-25 {
  position: absolute;
  left: 886.13px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
}
.n-8-26 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-26_1ad6ee.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-27 {
  position: absolute;
  left: 67.09px;
  top: 149.06px;
  width: 161.37px;
  height: 95px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 38.099998474121094px;
  line-height: 1.1548556892957988em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-28 {
  position: absolute;
  left: 1181.5px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
}
.n-8-29 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-29_1ad6ee.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-30 {
  position: absolute;
  left: 112.64px;
  top: 175.06px;
  width: 70.29px;
  height: 44px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 35.79999923706055px;
  line-height: 1.229050305522094em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-31 {
  position: absolute;
  left: 1476.88px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
}
.n-8-32 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-32_1ad6ee.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-33 {
  position: absolute;
  left: 74.5px;
  top: 149.06px;
  width: 146.57px;
  height: 95px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 38.400001525878906px;
  line-height: 1.1458332878020092em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-34 {
  position: absolute;
  left: 1772.25px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
}
.n-8-35 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-35_1ad6ee.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-36 {
  position: absolute;
  left: 93.86px;
  top: 175.06px;
  width: 107.84px;
  height: 44px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 35px;
  line-height: 1.2571428571428571em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-37 {
  position: absolute;
  left: 2067.63px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background: #000000;
}
.n-8-38 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 295.38px;
  height: 394.14px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-38_2abe42.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-39 {
  position: absolute;
  left: 79.68px;
  top: 149.06px;
  width: 136.2px;
  height: 95px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 37.29999923706055px;
  line-height: 1.1796246890075661em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-8-40 {
  position: absolute;
  left: 1837px;
  top: 402.14px;
  width: 27px;
  height: 27px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-40_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-41 {
  position: absolute;
  left: 1706px;
  top: 402.14px;
  width: 27px;
  height: 27px;
  box-sizing: border-box;
  background-image: url("/assets/img_8-41_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-8-42 {
  position: absolute;
  left: 1752px;
  top: 414.14px;
  width: 64px;
  height: 4px;
  overflow: hidden;
  background: transparent;
}
.n-4-29 {
  position: absolute;
  left: 0px;
  top: 1254px;
  width: 1920px;
  height: 1280px;
  box-sizing: border-box;
}
.n-4-30 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 960px;
  height: 1280px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-30_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-31 {
  position: absolute;
  left: 960px;
  top: 0px;
  width: 960px;
  height: 1280px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-31_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-32 {
  position: absolute;
  left: 752px;
  top: 427px;
  width: 416px;
  height: 308px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 89.5px;
  line-height: 1.005586592178771em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-33 {
  position: absolute;
  left: 811.86px;
  top: 737px;
  width: 296.47px;
  height: 39px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-34 {
  position: absolute;
  left: 858.02px;
  top: 796px;
  width: 100.78px;
  height: 30px;
  box-sizing: border-box;
}
.n-4-35 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 100.98px;
  height: 21px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.875em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-36 {
  position: absolute;
  left: 986.22px;
  top: 796px;
  width: 75.77px;
  height: 30px;
  box-sizing: border-box;
}
.n-4-37 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 75.96px;
  height: 21px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.875em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-38 {
  position: absolute;
  left: 8px;
  top: 2542px;
  width: 1904px;
  height: 1895.97px;
  box-sizing: border-box;
}
.n-4-39 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 629.33px;
  height: 1895.97px;
  box-sizing: border-box;
}
.n-4-40 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 629.31px;
  height: 943.97px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-41 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 629.31px;
  height: 944.97px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-41_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-42 {
  position: absolute;
  left: 0px;
  top: 951.98px;
  width: 629.31px;
  height: 943.97px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-43 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 629.31px;
  height: 944.97px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-43_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-44 {
  position: absolute;
  left: 637.33px;
  top: 0px;
  width: 629.33px;
  height: 690.8px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-45 {
  position: absolute;
  left: 0px;
  top: -0.5px;
  width: 629.33px;
  height: 692.75px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-45_43f25d.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-46 {
  position: absolute;
  left: 637.33px;
  top: 699.22px;
  width: 629.33px;
  height: 497.52px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-47 {
  position: absolute;
  left: 187.08px;
  top: 81.62px;
  width: 255.35px;
  height: 167.13px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 300;
  font-size: 71.9000015258789px;
  line-height: 0.9613352055591227em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-48 {
  position: absolute;
  left: 136.03px;
  top: 259.87px;
  width: 357.47px;
  height: 69px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-49 {
  position: absolute;
  left: 219.62px;
  top: 354.87px;
  width: 90.17px;
  height: 30px;
  box-sizing: border-box;
}
.n-4-50 {
  position: absolute;
  left: 0px;
  top: 6px;
  width: 90.37px;
  height: 18px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 2.142857142857143em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-51 {
  position: absolute;
  left: 341.8px;
  top: 354.87px;
  width: 67.89px;
  height: 30px;
  box-sizing: border-box;
}
.n-4-52 {
  position: absolute;
  left: 0px;
  top: 6px;
  width: 68.09px;
  height: 18px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 2.142857142857143em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-53 {
  position: absolute;
  left: 637.33px;
  top: 1204.73px;
  width: 629.33px;
  height: 690.8px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-54 {
  position: absolute;
  left: 0px;
  top: -0.5px;
  width: 629.33px;
  height: 692.75px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-54_43f25d.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-55 {
  position: absolute;
  left: 1274.66px;
  top: 0px;
  width: 629.33px;
  height: 1895.97px;
  box-sizing: border-box;
}
.n-4-56 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 629.33px;
  height: 467.41px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-57 {
  position: absolute;
  left: 0px;
  top: -0.33px;
  width: 629.33px;
  height: 468.98px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-57_32ccc3.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-58 {
  position: absolute;
  left: 0px;
  top: 475.69px;
  width: 629.33px;
  height: 943.98px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-59 {
  position: absolute;
  left: 0px;
  top: -0.33px;
  width: 629.33px;
  height: 943.98px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-59_1384e7.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-60 {
  position: absolute;
  left: 0px;
  top: 1428.27px;
  width: 629.33px;
  height: 467.41px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-61 {
  position: absolute;
  left: 0px;
  top: -0.33px;
  width: 629.33px;
  height: 468.98px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-61_32ccc3.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-62 {
  position: absolute;
  left: 0px;
  top: 4445.97px;
  width: 1920px;
  height: 1280px;
  box-sizing: border-box;
}
.n-4-63 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 1280px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-63_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-64 {
  position: absolute;
  left: 40px;
  top: 66px;
  width: 317.11px;
  height: 228px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 91.80000305175781px;
  line-height: 1.0893245825233682em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-65 {
  position: absolute;
  left: 40px;
  top: 301px;
  width: 277.26px;
  height: 69px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-66 {
  position: absolute;
  left: 40px;
  top: 390px;
  width: 100.78px;
  height: 30px;
  box-sizing: border-box;
}
.n-4-67 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 100.98px;
  height: 21px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.875em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-68 {
  position: absolute;
  left: 168.2px;
  top: 390px;
  width: 75.77px;
  height: 30px;
  box-sizing: border-box;
}
.n-4-69 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 75.97px;
  height: 21px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.875em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-70 {
  position: absolute;
  left: 0px;
  top: 5725.97px;
  width: 1920px;
  height: 1280px;
  box-sizing: border-box;
}
.n-4-71 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 960px;
  height: 1280px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-71_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-72 {
  position: absolute;
  left: 960px;
  top: 0px;
  width: 960px;
  height: 1280px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-72_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-73 {
  position: absolute;
  left: 704.44px;
  top: 472px;
  width: 511.31px;
  height: 218px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 93.5999984741211px;
  line-height: 0.9615384772135821em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-74 {
  position: absolute;
  left: 814.08px;
  top: 692px;
  width: 292.04px;
  height: 39px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-75 {
  position: absolute;
  left: 858.02px;
  top: 751px;
  width: 100.78px;
  height: 30px;
  box-sizing: border-box;
}
.n-4-76 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 100.98px;
  height: 21px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.875em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-77 {
  position: absolute;
  left: 986.22px;
  top: 751px;
  width: 75.77px;
  height: 30px;
  box-sizing: border-box;
}
.n-4-78 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 75.96px;
  height: 21px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.875em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-79 {
  position: absolute;
  left: 0px;
  top: 7005.97px;
  width: 1920px;
  height: 406px;
  box-sizing: border-box;
}
.n-4-80 {
  position: absolute;
  left: 725.75px;
  top: 66px;
  width: 468.7px;
  height: 228px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 91.80000305175781px;
  line-height: 1.0893245825233682em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-81 {
  position: absolute;
  left: 800.56px;
  top: 300px;
  width: 319.06px;
  height: 24px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-82 {
  position: absolute;
  left: 0px;
  top: 7411.97px;
  width: 1920px;
  height: 800px;
  box-sizing: border-box;
}
.n-4-83 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 640px;
  height: 800px;
  box-sizing: border-box;
}
.n-4-84 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 640px;
  height: 800px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-84_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-85 {
  position: absolute;
  left: 40px;
  top: 746px;
  width: 108.43px;
  height: 14px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-86 {
  position: absolute;
  left: 640px;
  top: 0px;
  width: 640px;
  height: 800px;
  box-sizing: border-box;
}
.n-4-87 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 640px;
  height: 800px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-87_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-88 {
  position: absolute;
  left: 40px;
  top: 746px;
  width: 63.84px;
  height: 14px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-89 {
  position: absolute;
  left: 1280px;
  top: 0px;
  width: 640px;
  height: 800px;
  box-sizing: border-box;
}
.n-4-90 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 640px;
  height: 800px;
  box-sizing: border-box;
  background-image: url("/assets/img_4-90_56586a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
}
.n-4-91 {
  position: absolute;
  left: 40px;
  top: 746px;
  width: 70.25px;
  height: 14px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-92 {
  position: absolute;
  left: 0px;
  top: 8211.97px;
  width: 1920px;
  height: 460px;
  box-sizing: border-box;
}
.n-4-93 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 460px;
  overflow: hidden;
  background: transparent;
}
.n-4-97 {
  position: absolute;
  left: 799.45px;
  top: 80px;
  width: 321.3px;
  height: 36px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 500;
  font-size: 38.900001525878906px;
  line-height: 0.9254498351638977em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-98 {
  position: absolute;
  left: 613.42px;
  top: 134px;
  width: 693.36px;
  height: 103px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 77.5px;
  line-height: 1.032258064516129em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-99 {
  position: absolute;
  left: 759.55px;
  top: 261px;
  width: 401.09px;
  height: 45px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-100 {
  position: absolute;
  left: 886.19px;
  top: 332px;
  width: 147.61px;
  height: 53px;
  box-sizing: border-box;
}
.n-4-101 {
  position: absolute;
  left: 33px;
  top: 16px;
  width: 81.81px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-102 {
  position: absolute;
  left: 0px;
  top: 8671.97px;
  width: 1920px;
  height: 322px;
  box-sizing: border-box;
  background: #ffffff;
}
.n-4-103 {
  position: absolute;
  left: 0px;
  top: 120px;
  width: 1920px;
  height: 81px;
  box-sizing: border-box;
}
.n-4-104 {
  position: absolute;
  left: 60.86px;
  top: 0px;
  width: 447px;
  height: 81px;
  box-sizing: border-box;
}
.n-4-105 {
  position: absolute;
  left: 133.12px;
  top: 3px;
  width: 180.95px;
  height: 41px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-106 {
  position: absolute;
  left: 155.67px;
  top: 59px;
  width: 58.83px;
  height: 22px;
  box-sizing: border-box;
}
.n-4-107 {
  position: absolute;
  left: 0px;
  top: -3px;
  width: 59.03px;
  height: 21px;
  color: #696969;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-108 {
  position: absolute;
  left: 257.52px;
  top: 59px;
  width: 33.81px;
  height: 22px;
  box-sizing: border-box;
}
.n-4-109 {
  position: absolute;
  left: 0px;
  top: -3px;
  width: 34.01px;
  height: 21px;
  color: #696969;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-110 {
  position: absolute;
  left: 511.28px;
  top: 0px;
  width: 447px;
  height: 81px;
  box-sizing: border-box;
}
.n-4-111 {
  position: absolute;
  left: 140.95px;
  top: 3px;
  width: 166.29px;
  height: 41px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-112 {
  position: absolute;
  left: 156.17px;
  top: 59px;
  width: 58.83px;
  height: 22px;
  box-sizing: border-box;
}
.n-4-113 {
  position: absolute;
  left: 0px;
  top: -3px;
  width: 59.03px;
  height: 21px;
  color: #696969;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-114 {
  position: absolute;
  left: 258.02px;
  top: 59px;
  width: 33.81px;
  height: 22px;
  box-sizing: border-box;
}
.n-4-115 {
  position: absolute;
  left: 0px;
  top: -3px;
  width: 34.01px;
  height: 21px;
  color: #696969;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-116 {
  position: absolute;
  left: 961.7px;
  top: 0px;
  width: 447px;
  height: 81px;
  box-sizing: border-box;
}
.n-4-117 {
  position: absolute;
  left: 190.02px;
  top: 3px;
  width: 68.17px;
  height: 41px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-118 {
  position: absolute;
  left: 156.18px;
  top: 59px;
  width: 58.83px;
  height: 22px;
  box-sizing: border-box;
}
.n-4-119 {
  position: absolute;
  left: 0px;
  top: -3px;
  width: 59.03px;
  height: 21px;
  color: #696969;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-120 {
  position: absolute;
  left: 258.02px;
  top: 59px;
  width: 33.81px;
  height: 22px;
  box-sizing: border-box;
}
.n-4-121 {
  position: absolute;
  left: 0px;
  top: -3px;
  width: 34.01px;
  height: 21px;
  color: #696969;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-122 {
  position: absolute;
  left: 1412.13px;
  top: 0px;
  width: 447px;
  height: 81px;
  box-sizing: border-box;
}
.n-4-123 {
  position: absolute;
  left: 163.62px;
  top: 3px;
  width: 120.95px;
  height: 41px;
  color: #000000;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.5em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-124 {
  position: absolute;
  left: 156.17px;
  top: 59px;
  width: 58.83px;
  height: 22px;
  box-sizing: border-box;
}
.n-4-125 {
  position: absolute;
  left: 0px;
  top: -3px;
  width: 59.03px;
  height: 21px;
  color: #696969;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-126 {
  position: absolute;
  left: 258.01px;
  top: 59px;
  width: 33.81px;
  height: 22px;
  box-sizing: border-box;
}
.n-4-127 {
  position: absolute;
  left: 0px;
  top: -3px;
  width: 34.01px;
  height: 21px;
  color: #696969;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-128 {
  position: absolute;
  left: 0px;
  top: 9164.97px;
  width: 1920px;
  height: 704.31px;
  box-sizing: border-box;
  background: #000000;
}
.n-4-129 {
  position: absolute;
  left: 498.09px;
  top: 56px;
  width: 32.56px;
  height: 19.5px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.3em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-130 {
  position: absolute;
  left: 498.09px;
  top: 91.5px;
  width: 298.91px;
  height: 332.08px;
  box-sizing: border-box;
}
.n-4-131 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 111.01px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-132 {
  position: absolute;
  left: 0px;
  top: 47.5px;
  width: 32.26px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12.600000381469727px;
  line-height: 1.5476190007643018em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-133 {
  position: absolute;
  left: 0px;
  top: 91px;
  width: 70.14px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-134 {
  position: absolute;
  left: 0px;
  top: 134.5px;
  width: 74.01px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-135 {
  position: absolute;
  left: 0px;
  top: 178px;
  width: 46.76px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-136 {
  position: absolute;
  left: 0px;
  top: 221.5px;
  width: 54.68px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-137 {
  position: absolute;
  left: 0px;
  top: 265px;
  width: 76.98px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-138 {
  position: absolute;
  left: 0px;
  top: 307.5px;
  width: 58.28px;
  height: 24.58px;
  box-sizing: border-box;
}
.n-4-139 {
  position: absolute;
  left: 0px;
  top: 3.58px;
  width: 20px;
  height: 16px;
  overflow: hidden;
  background: transparent;
}
.n-4-142 {
  position: absolute;
  left: 26.99px;
  top: 1px;
  width: 31.5px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-143 {
  position: absolute;
  left: 38.02px;
  top: 57px;
  width: 81.17px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-144 {
  position: absolute;
  left: 38.02px;
  top: 104.5px;
  width: 74.42px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-145 {
  position: absolute;
  left: 38.02px;
  top: 152px;
  width: 44.7px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-146 {
  position: absolute;
  left: 38.02px;
  top: 199.5px;
  width: 106.23px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-147 {
  position: absolute;
  left: 38.02px;
  top: 247px;
  width: 136.4px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-148 {
  position: absolute;
  left: 38.02px;
  top: 294.5px;
  width: 47.06px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-149 {
  position: absolute;
  left: 38.02px;
  top: 342px;
  width: 137.64px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-150 {
  position: absolute;
  left: 38.02px;
  top: 389.5px;
  width: 209.64px;
  height: 20px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-151 {
  position: absolute;
  left: 813px;
  top: 56px;
  width: 43.15px;
  height: 19.5px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.3em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-152 {
  position: absolute;
  left: 813px;
  top: 91.5px;
  width: 449px;
  height: 158px;
  box-sizing: border-box;
}
.n-4-153 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 113.92px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-154 {
  position: absolute;
  left: 0px;
  top: 47.5px;
  width: 50.34px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-155 {
  position: absolute;
  left: 0px;
  top: 91px;
  width: 132.06px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-156 {
  position: absolute;
  left: 0px;
  top: 134.5px;
  width: 156.73px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-157 {
  position: absolute;
  left: 813px;
  top: 275.5px;
  width: 51.92px;
  height: 19.5px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 1.3em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-158 {
  position: absolute;
  left: 813px;
  top: 311px;
  width: 449px;
  height: 158px;
  box-sizing: border-box;
}
.n-4-159 {
  position: absolute;
  left: 0px;
  top: 4px;
  width: 111.43px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-160 {
  position: absolute;
  left: 0px;
  top: 47.5px;
  width: 98.95px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-161 {
  position: absolute;
  left: 0px;
  top: 91px;
  width: 82.87px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12.899999618530273px;
  line-height: 1.5116279516775428em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-162 {
  position: absolute;
  left: 0px;
  top: 134.5px;
  width: 60px;
  height: 17px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-163 {
  position: absolute;
  left: 1278px;
  top: 56px;
  width: 603.98px;
  height: 24px;
  overflow: hidden;
  background: transparent;
}
.n-4-180 {
  position: absolute;
  left: 38px;
  top: 522px;
  width: 108px;
  height: 20px;
  overflow: hidden;
  background: transparent;
}
.n-4-183 {
  position: absolute;
  left: 38px;
  top: 558px;
  width: 1844px;
  height: 24px;
  box-sizing: border-box;
}
.n-4-184 {
  position: absolute;
  left: 0px;
  top: 5px;
  width: 269.25px;
  height: 16px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-185 {
  position: absolute;
  left: 284.47px;
  top: 5px;
  width: 102.33px;
  height: 16px;
  box-sizing: border-box;
}
.n-4-186 {
  position: absolute;
  left: -3px;
  top: 0px;
  width: 3.54px;
  height: 18px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-187 {
  position: absolute;
  left: 12px;
  top: 0px;
  width: 78.53px;
  height: 16px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-188 {
  position: absolute;
  left: 390.22px;
  top: 5px;
  width: 130.17px;
  height: 16px;
  box-sizing: border-box;
}
.n-4-189 {
  position: absolute;
  left: -3px;
  top: 0px;
  width: 3.54px;
  height: 18px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-190 {
  position: absolute;
  left: 12px;
  top: 0px;
  width: 106.37px;
  height: 16px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-191 {
  position: absolute;
  left: 523.81px;
  top: 5px;
  width: 280.38px;
  height: 16px;
  box-sizing: border-box;
}
.n-4-192 {
  position: absolute;
  left: -3px;
  top: 0px;
  width: 3.54px;
  height: 18px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-193 {
  position: absolute;
  left: 12px;
  top: 0px;
  width: 256.58px;
  height: 16px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-194 {
  position: absolute;
  left: 807.61px;
  top: 5px;
  width: 134.86px;
  height: 16px;
  box-sizing: border-box;
}
.n-4-195 {
  position: absolute;
  left: -3px;
  top: 0px;
  width: 3.54px;
  height: 18px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-196 {
  position: absolute;
  left: 12px;
  top: 0px;
  width: 111.06px;
  height: 16px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-197 {
  position: absolute;
  left: 38px;
  top: 587px;
  width: 113.51px;
  height: 16px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-198 {
  position: absolute;
  left: 159.97px;
  top: 587px;
  width: 3.54px;
  height: 18px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-199 {
  position: absolute;
  left: 178.73px;
  top: 587px;
  width: 283.41px;
  height: 16px;
  color: #808080;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-200 {
  position: absolute;
  left: 38px;
  top: 627px;
  width: 112.14px;
  height: 18px;
  box-sizing: border-box;
}
.n-4-201 {
  position: absolute;
  left: 0px;
  top: 1.31px;
  width: 20px;
  height: 20px;
  overflow: hidden;
  background: transparent;
}
.n-4-205 {
  position: absolute;
  left: 20px;
  top: 0px;
  width: 92.34px;
  height: 18px;
  color: #999999;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-211 {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1920px;
  height: 0.01px;
  box-sizing: border-box;
}
.n-4-216 {
  position: absolute;
  left: 667.06px;
  top: 4px;
  width: 585.88px;
  height: 80px;
  box-sizing: border-box;
}
.n-14-46 {
  position: absolute;
  left: -629.06px;
  top: 21px;
  height: 44px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "ArTarumianKamar",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 32.79999923706055px;
  line-height: 1.3414634458370545em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.n-4-217 {
  position: absolute;
  left: 16px;
  top: 32px;
  width: 28.5px;
  height: 17px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-218 {
  position: absolute;
  left: 76.3px;
  top: 32px;
  width: 49px;
  height: 17px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-219 {
  position: absolute;
  left: 157.1px;
  top: 32px;
  width: 28.28px;
  height: 17px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-220 {
  position: absolute;
  left: 217.17px;
  top: 32px;
  width: 70.37px;
  height: 17px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-221 {
  position: absolute;
  left: 319.35px;
  top: 32px;
  width: 63.73px;
  height: 17px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-222 {
  position: absolute;
  left: 414.88px;
  top: 32px;
  width: 26.25px;
  height: 17px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-223 {
  position: absolute;
  left: 472.92px;
  top: 32px;
  width: 38.2px;
  height: 17px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-224 {
  position: absolute;
  left: 542.92px;
  top: 32px;
  width: 27.15px;
  height: 17px;
  color: #ffffff;
  white-space: pre-line;
  font-family:
    "Arial",
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1em;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.n-4-225 {
  position: absolute;
  left: 1774px;
  top: 34px;
  width: 20px;
  height: 20px;
  overflow: hidden;
  background: transparent;
}
.n-4-227 {
  position: absolute;
  left: 1818px;
  top: 34px;
  width: 20px;
  height: 20px;
  overflow: hidden;
  background: transparent;
}
.n-4-229 {
  position: absolute;
  left: 1862px;
  top: 34px;
  width: 20px;
  height: 20px;
  overflow: hidden;
  background: transparent;
}
`,
        }}
      />
      <FigmaScaler baseWidth={1920} />
      <div
        className="figma-node n-4-2"
        data-node-id="4:2"
        data-node-name="Main"
        data-node-type="FRAME"
      >
        <div
          className="figma-node n-4-3"
          data-node-id="4:3"
          data-node-name="Background"
          data-node-type="FRAME"
        >
          <div
            className="figma-node n-4-4"
            data-node-id="4:4"
            data-node-name="Main â†’ This phone is a requirement to support existing Gomez monitor of SiteGenesis. Demadware customers ca..."
            data-node-type="FRAME"
          >
            <div
              className="figma-node n-8-2"
              data-node-id="8:2"
              data-node-name="Container"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-8-3"
                data-node-id="8:3"
                data-node-name="Container"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-8-4"
                  data-node-id="8:4"
                  data-node-name="Shop Calvin Klein jeans."
                  data-node-type="FRAME"
                ></div>
                <div
                  className="figma-node n-8-5"
                  data-node-id="8:5"
                  data-node-name="Shots for your Body"
                  data-node-type="TEXT"
                >
                  Shots for your Body
                </div>
                <div
                  className="figma-node n-8-6"
                  data-node-id="8:6"
                  data-node-name="Find the perfect fit:"
                  data-node-type="TEXT"
                >
                  Find the perfect fit:{" "}
                </div>
                <div
                  className="figma-node n-8-7"
                  data-node-id="8:7"
                  data-node-name="Link â†’ Women"
                  data-node-type="TEXT"
                >
                  Women{" "}
                </div>
                <div
                  className="figma-node n-8-8"
                  data-node-id="8:8"
                  data-node-name="Link â†’ Men"
                  data-node-type="TEXT"
                >
                  Men
                </div>
                <div
                  className="figma-node n-8-9"
                  data-node-id="8:9"
                  data-node-name="Link"
                  data-node-type="IMAGE-SVG"
                >
                  <img className="figma-img" alt="" src="/assets/svg_8-9.svg" />
                </div>
              </div>
              <div
                className="figma-node n-8-15"
                data-node-id="8:15"
                data-node-name="Container"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-8-16"
                  data-node-id="8:16"
                  data-node-name="Group - 1 / 8"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-8-17"
                    data-node-id="8:17"
                    data-node-name="Picture â†’ Shop Calvin Klein jeans."
                    data-node-type="FRAME"
                  ></div>
                  <div
                    className="figma-node n-8-18"
                    data-node-id="8:18"
                    data-node-name="Baggy"
                    data-node-type="TEXT"
                  >
                    Baggy
                  </div>
                </div>
                <div
                  className="figma-node n-8-19"
                  data-node-id="8:19"
                  data-node-name="Group - 2 / 8"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-8-20"
                    data-node-id="8:20"
                    data-node-name="Picture â†’ Shop Calvin Klein jeans."
                    data-node-type="FRAME"
                  ></div>
                  <div
                    className="figma-node n-8-21"
                    data-node-id="8:21"
                    data-node-name="90s Straight"
                    data-node-type="TEXT"
                  >
                    90s Straight
                  </div>
                </div>
                <div
                  className="figma-node n-8-22"
                  data-node-id="8:22"
                  data-node-name="Group - 3 / 8"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-8-23"
                    data-node-id="8:23"
                    data-node-name="Picture â†’ Shop Calvin Klein jeans."
                    data-node-type="FRAME"
                  ></div>
                  <div
                    className="figma-node n-8-24"
                    data-node-id="8:24"
                    data-node-name="90s Tapered"
                    data-node-type="TEXT"
                  >
                    90s Tapered
                  </div>
                </div>
                <div
                  className="figma-node n-8-25"
                  data-node-id="8:25"
                  data-node-name="Group - 4 / 8"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-8-26"
                    data-node-id="8:26"
                    data-node-name="Picture â†’ Shop Calvin Klein jeans."
                    data-node-type="FRAME"
                  ></div>
                  <div
                    className="figma-node n-8-27"
                    data-node-id="8:27"
                    data-node-name="Standard Straight"
                    data-node-type="TEXT"
                  >
                    Standard Straight
                  </div>
                </div>
                <div
                  className="figma-node n-8-28"
                  data-node-id="8:28"
                  data-node-name="Group - 5 / 8"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-8-29"
                    data-node-id="8:29"
                    data-node-name="Picture â†’ Shop Calvin Klein jeans."
                    data-node-type="FRAME"
                  ></div>
                  <div
                    className="figma-node n-8-30"
                    data-node-id="8:30"
                    data-node-name="Slim"
                    data-node-type="TEXT"
                  >
                    Slim
                  </div>
                </div>
                <div
                  className="figma-node n-8-31"
                  data-node-id="8:31"
                  data-node-name="Group - 6 / 8"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-8-32"
                    data-node-id="8:32"
                    data-node-name="Picture â†’ Shop Calvin Klein jeans."
                    data-node-type="FRAME"
                  ></div>
                  <div
                    className="figma-node n-8-33"
                    data-node-id="8:33"
                    data-node-name="Slim Tapered"
                    data-node-type="TEXT"
                  >
                    Slim Tapered
                  </div>
                </div>
                <div
                  className="figma-node n-8-34"
                  data-node-id="8:34"
                  data-node-name="Group - 7 / 8"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-8-35"
                    data-node-id="8:35"
                    data-node-name="Picture â†’ Shop Calvin Klein jeans."
                    data-node-type="FRAME"
                  ></div>
                  <div
                    className="figma-node n-8-36"
                    data-node-id="8:36"
                    data-node-name="Skinny"
                    data-node-type="TEXT"
                  >
                    Skinny
                  </div>
                </div>
                <div
                  className="figma-node n-8-37"
                  data-node-id="8:37"
                  data-node-name="Group - 8 / 8"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-8-38"
                    data-node-id="8:38"
                    data-node-name="Shop Calvin Klein jeans."
                    data-node-type="FRAME"
                  ></div>
                  <div
                    className="figma-node n-8-39"
                    data-node-id="8:39"
                    data-node-name="Shop all Denim"
                    data-node-type="TEXT"
                  >
                    Shop all Denim
                  </div>
                </div>
                <div
                  className="figma-node n-8-40"
                  data-node-id="8:40"
                  data-node-name="Button - Next slide â†’ Shop Calvin Klein jeans."
                  data-node-type="FRAME"
                ></div>
                <div
                  className="figma-node n-8-41"
                  data-node-id="8:41"
                  data-node-name="Button - Previous slide â†’ Shop Calvin Klein jeans."
                  data-node-type="FRAME"
                ></div>
                <div
                  className="figma-node n-8-42"
                  data-node-id="8:42"
                  data-node-name="Overlay"
                  data-node-type="IMAGE-SVG"
                >
                  <img
                    className="figma-img"
                    alt=""
                    src="/assets/svg_8-42.svg"
                  />
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-29"
              data-node-id="4:29"
              data-node-name="Section"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-30"
                data-node-id="4:30"
                data-node-name="Picture â†’ HP_Spring_W.webp"
                data-node-type="FRAME"
              ></div>
              <div
                className="figma-node n-4-31"
                data-node-id="4:31"
                data-node-name="Picture â†’ HP_Spring_M.webp"
                data-node-type="FRAME"
              ></div>
              <div
                className="figma-node n-4-32"
                data-node-id="4:32"
                data-node-name="Spring Getaway Essentials"
                data-node-type="TEXT"
              >
                Spring Getaway Essentials
              </div>
              <div
                className="figma-node n-4-33"
                data-node-id="4:33"
                data-node-name="Polished shirts and lightweight fabrics for long trips and warm days. Live in luxurious comfort."
                data-node-type="TEXT"
              >
                Polished shirts and lightweight fabrics for long trips and warm
                days. Live in luxurious comfort.
              </div>
              <div
                className="figma-node n-4-34"
                data-node-id="4:34"
                data-node-name="Link"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-35"
                  data-node-id="4:35"
                  data-node-name="Shop Women"
                  data-node-type="TEXT"
                >
                  Shop Women
                </div>
              </div>
              <div
                className="figma-node n-4-36"
                data-node-id="4:36"
                data-node-name="Link"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-37"
                  data-node-id="4:37"
                  data-node-name="Shop Men"
                  data-node-type="TEXT"
                >
                  Shop Men
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-38"
              data-node-id="4:38"
              data-node-name="Section"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-39"
                data-node-id="4:39"
                data-node-name="Link - Models posing in 90s inspired looks"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-40"
                  data-node-id="4:40"
                  data-node-name="Background"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-41"
                    data-node-id="4:41"
                    data-node-name="Picture â†’ HP_90s_Edit_1.webp"
                    data-node-type="FRAME"
                  ></div>
                </div>
                <div
                  className="figma-node n-4-42"
                  data-node-id="4:42"
                  data-node-name="Background"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-43"
                    data-node-id="4:43"
                    data-node-name="Picture â†’ HP_90s_Edit_4.webp"
                    data-node-type="FRAME"
                  ></div>
                </div>
              </div>
              <div
                className="figma-node n-4-44"
                data-node-id="4:44"
                data-node-name="Background"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-45"
                  data-node-id="4:45"
                  data-node-name="Link â†’ Picture â†’ Models posing in 90s inspired looks"
                  data-node-type="FRAME"
                ></div>
              </div>
              <div
                className="figma-node n-4-46"
                data-node-id="4:46"
                data-node-name="Background"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-47"
                  data-node-id="4:47"
                  data-node-name="The 90s Edit"
                  data-node-type="TEXT"
                >
                  The 90s Edit
                </div>
                <div
                  className="figma-node n-4-48"
                  data-node-id="4:48"
                  data-node-name="Iconic then. Iconic now. Minimalism that defined an era, styled for today. Captured at Calvin Kleinâ€™s original New York office."
                  data-node-type="TEXT"
                >
                  Iconic then. Iconic now. Minimalism that defined an era,
                  styled for today. Captured at Calvin Kleinâ€™s original New
                  York office.
                </div>
                <div
                  className="figma-node n-4-49"
                  data-node-id="4:49"
                  data-node-name="Link"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-50"
                    data-node-id="4:50"
                    data-node-name="Shop Women"
                    data-node-type="TEXT"
                  >
                    Shop Women
                  </div>
                </div>
                <div
                  className="figma-node n-4-51"
                  data-node-id="4:51"
                  data-node-name="Link"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-52"
                    data-node-id="4:52"
                    data-node-name="Shop Men"
                    data-node-type="TEXT"
                  >
                    Shop Men
                  </div>
                </div>
              </div>
              <div
                className="figma-node n-4-53"
                data-node-id="4:53"
                data-node-name="Background"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-54"
                  data-node-id="4:54"
                  data-node-name="Link â†’ Picture â†’ Models posing in 90s inspired looks"
                  data-node-type="FRAME"
                ></div>
              </div>
              <div
                className="figma-node n-4-55"
                data-node-id="4:55"
                data-node-name="Link - Models posing in 90s inspired looks"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-56"
                  data-node-id="4:56"
                  data-node-name="Background"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-57"
                    data-node-id="4:57"
                    data-node-name="Picture â†’ HP_90s_Edit_3.webp"
                    data-node-type="FRAME"
                  ></div>
                </div>
                <div
                  className="figma-node n-4-58"
                  data-node-id="4:58"
                  data-node-name="Background"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-59"
                    data-node-id="4:59"
                    data-node-name="Picture â†’ HP_90s_Edit_6.webp"
                    data-node-type="FRAME"
                  ></div>
                </div>
                <div
                  className="figma-node n-4-60"
                  data-node-id="4:60"
                  data-node-name="Background"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-61"
                    data-node-id="4:61"
                    data-node-name="Picture â†’ HP_90s_Edit_7.webp"
                    data-node-type="FRAME"
                  ></div>
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-62"
              data-node-id="4:62"
              data-node-name="Section"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-63"
                data-node-id="4:63"
                data-node-name="Link â†’ Picture â†’ Models posing in Calvin Klein spring jackets"
                data-node-type="FRAME"
              ></div>
              <div
                className="figma-node n-4-64"
                data-node-id="4:64"
                data-node-name="Heading â†’ Spring
Jackets"
                data-node-type="TEXT"
              >
                Spring Jackets
              </div>
              <div
                className="figma-node n-4-65"
                data-node-id="4:65"
                data-node-name="Sporty silhouettes with modern detail. Lightweight jackets designed for life outdoors."
                data-node-type="TEXT"
              >
                Sporty silhouettes with modern detail. Lightweight jackets
                designed for life outdoors.
              </div>
              <div
                className="figma-node n-4-66"
                data-node-id="4:66"
                data-node-name="Link"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-67"
                  data-node-id="4:67"
                  data-node-name="Shop Women"
                  data-node-type="TEXT"
                >
                  Shop Women
                </div>
              </div>
              <div
                className="figma-node n-4-68"
                data-node-id="4:68"
                data-node-name="Link"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-69"
                  data-node-id="4:69"
                  data-node-name="Shop Men"
                  data-node-type="TEXT"
                >
                  Shop Men
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-70"
              data-node-id="4:70"
              data-node-name="Section"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-71"
                data-node-id="4:71"
                data-node-name="Link â†’ Picture â†’ Models posing in Calvin Klein denim"
                data-node-type="FRAME"
              ></div>
              <div
                className="figma-node n-4-72"
                data-node-id="4:72"
                data-node-name="Picture â†’ HP_90s_M.webp"
                data-node-type="FRAME"
              ></div>
              <div
                className="figma-node n-4-73"
                data-node-id="4:73"
                data-node-name="New 90s Washes"
                data-node-type="TEXT"
              >
                New 90s Washes
              </div>
              <div
                className="figma-node n-4-74"
                data-node-id="4:74"
                data-node-name="Signature denim fits in new shades for spring. Easy living in the classic straight leg."
                data-node-type="TEXT"
              >
                Signature denim fits in new shades for spring. Easy living in
                the classic straight leg.
              </div>
              <div
                className="figma-node n-4-75"
                data-node-id="4:75"
                data-node-name="Link"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-76"
                  data-node-id="4:76"
                  data-node-name="Shop Women"
                  data-node-type="TEXT"
                >
                  Shop Women
                </div>
              </div>
              <div
                className="figma-node n-4-77"
                data-node-id="4:77"
                data-node-name="Link"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-78"
                  data-node-id="4:78"
                  data-node-name="Shop Men"
                  data-node-type="TEXT"
                >
                  Shop Men
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-79"
              data-node-id="4:79"
              data-node-name='Section - section class="half_width'
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-80"
                data-node-id="4:80"
                data-node-name="Heading â†’ Live in
Calvin Klein"
                data-node-type="TEXT"
              >
                Live in Calvin Klein
              </div>
              <div
                className="figma-node n-4-81"
                data-node-id="4:81"
                data-node-name="Live like an icon. Shop our latest campaigns."
                data-node-type="TEXT"
              >
                Live like an icon. Shop our latest campaigns.
              </div>
            </div>
            <div
              className="figma-node n-4-82"
              data-node-id="4:82"
              data-node-name="Section"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-83"
                data-node-id="4:83"
                data-node-name="Group - 1 / 3"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-84"
                  data-node-id="4:84"
                  data-node-name="Link â†’ Picture â†’ Dakota Johnson posing in Calvin Klein underwear"
                  data-node-type="FRAME"
                ></div>
                <div
                  className="figma-node n-4-85"
                  data-node-id="4:85"
                  data-node-name="Dakota Johnson"
                  data-node-type="TEXT"
                >
                  Dakota Johnson
                </div>
              </div>
              <div
                className="figma-node n-4-86"
                data-node-id="4:86"
                data-node-name="Group - 2 / 3"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-87"
                  data-node-id="4:87"
                  data-node-name="Link â†’ Picture â†’ Raphinha posing in Calvin Klein underwear"
                  data-node-type="FRAME"
                ></div>
                <div
                  className="figma-node n-4-88"
                  data-node-id="4:88"
                  data-node-name="Raphinha"
                  data-node-type="TEXT"
                >
                  Raphinha
                </div>
              </div>
              <div
                className="figma-node n-4-89"
                data-node-id="4:89"
                data-node-name="Group - 3 / 3"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-90"
                  data-node-id="4:90"
                  data-node-name="Link â†’ Picture â†’ Jung Kook posing in Calvin Klein apparel"
                  data-node-type="FRAME"
                ></div>
                <div
                  className="figma-node n-4-91"
                  data-node-id="4:91"
                  data-node-name="Jung Kook"
                  data-node-type="TEXT"
                >
                  Jung Kook
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-92"
              data-node-id="4:92"
              data-node-name="Section"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-93"
                data-node-id="4:93"
                data-node-name="Container"
                data-node-type="IMAGE-SVG"
              >
                <img className="figma-img" alt="" src="/assets/svg_4-93.svg" />
              </div>
              <div
                className="figma-node n-4-97"
                data-node-id="4:97"
                data-node-name='p class="text_heading eyebrow"&gt;Introducing&lt;/p â†’ My Calvin Rewards'
                data-node-type="TEXT"
              >
                My Calvin Rewards
              </div>
              <div
                className="figma-node n-4-98"
                data-node-id="4:98"
                data-node-name="Earn. Redeem. Enjoy."
                data-node-type="TEXT"
              >
                Earn. Redeem. Enjoy.
              </div>
              <div
                className="figma-node n-4-99"
                data-node-id="4:99"
                data-node-name="A new way to experience Calvin Klein. Unlock exclusive benefits designed for you, every time you shop."
                data-node-type="TEXT"
              >
                A new way to experience Calvin Klein. Unlock exclusive benefits
                designed for you, every time you shop.
              </div>
              <div
                className="figma-node n-4-100"
                data-node-id="4:100"
                data-node-name="Link"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-101"
                  data-node-id="4:101"
                  data-node-name="Learn More"
                  data-node-type="TEXT"
                >
                  Learn More
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-102"
              data-node-id="4:102"
              data-node-name="Section â†’ Tabpanel"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-103"
                data-node-id="4:103"
                data-node-name="List"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-104"
                  data-node-id="4:104"
                  data-node-name="Heading"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-105"
                    data-node-id="4:105"
                    data-node-name="New Arrivals"
                    data-node-type="TEXT"
                  >
                    New Arrivals
                  </div>
                  <div
                    className="figma-node n-4-106"
                    data-node-id="4:106"
                    data-node-name="Link -  Women  New Arrivals"
                    data-node-type="FRAME"
                  >
                    <div
                      className="figma-node n-4-107"
                      data-node-id="4:107"
                      data-node-name="Women"
                      data-node-type="TEXT"
                    >
                      Women
                    </div>
                  </div>
                  <div
                    className="figma-node n-4-108"
                    data-node-id="4:108"
                    data-node-name="Link -  Men  New Arrivals"
                    data-node-type="FRAME"
                  >
                    <div
                      className="figma-node n-4-109"
                      data-node-id="4:109"
                      data-node-name="Men"
                      data-node-type="TEXT"
                    >
                      Men
                    </div>
                  </div>
                </div>
                <div
                  className="figma-node n-4-110"
                  data-node-id="4:110"
                  data-node-name="Heading"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-111"
                    data-node-id="4:111"
                    data-node-name="Underwear"
                    data-node-type="TEXT"
                  >
                    Underwear
                  </div>
                  <div
                    className="figma-node n-4-112"
                    data-node-id="4:112"
                    data-node-name="Link -  Women  Underwear"
                    data-node-type="FRAME"
                  >
                    <div
                      className="figma-node n-4-113"
                      data-node-id="4:113"
                      data-node-name="Women"
                      data-node-type="TEXT"
                    >
                      Women
                    </div>
                  </div>
                  <div
                    className="figma-node n-4-114"
                    data-node-id="4:114"
                    data-node-name="Link -  Men  Underwear"
                    data-node-type="FRAME"
                  >
                    <div
                      className="figma-node n-4-115"
                      data-node-id="4:115"
                      data-node-name="Men"
                      data-node-type="TEXT"
                    >
                      Men
                    </div>
                  </div>
                </div>
                <div
                  className="figma-node n-4-116"
                  data-node-id="4:116"
                  data-node-name="Heading"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-117"
                    data-node-id="4:117"
                    data-node-name="Tops"
                    data-node-type="TEXT"
                  >
                    Tops
                  </div>
                  <div
                    className="figma-node n-4-118"
                    data-node-id="4:118"
                    data-node-name="Link -  Women  Tops"
                    data-node-type="FRAME"
                  >
                    <div
                      className="figma-node n-4-119"
                      data-node-id="4:119"
                      data-node-name="Women"
                      data-node-type="TEXT"
                    >
                      Women
                    </div>
                  </div>
                  <div
                    className="figma-node n-4-120"
                    data-node-id="4:120"
                    data-node-name="Link -  Men  Tops"
                    data-node-type="FRAME"
                  >
                    <div
                      className="figma-node n-4-121"
                      data-node-id="4:121"
                      data-node-name="Men"
                      data-node-type="TEXT"
                    >
                      Men
                    </div>
                  </div>
                </div>
                <div
                  className="figma-node n-4-122"
                  data-node-id="4:122"
                  data-node-name="Heading"
                  data-node-type="FRAME"
                >
                  <div
                    className="figma-node n-4-123"
                    data-node-id="4:123"
                    data-node-name="Bottoms"
                    data-node-type="TEXT"
                  >
                    Bottoms
                  </div>
                  <div
                    className="figma-node n-4-124"
                    data-node-id="4:124"
                    data-node-name="Link -  Women  Bottoms"
                    data-node-type="FRAME"
                  >
                    <div
                      className="figma-node n-4-125"
                      data-node-id="4:125"
                      data-node-name="Women"
                      data-node-type="TEXT"
                    >
                      Women
                    </div>
                  </div>
                  <div
                    className="figma-node n-4-126"
                    data-node-id="4:126"
                    data-node-name="Link -  Men  Bottoms"
                    data-node-type="FRAME"
                  >
                    <div
                      className="figma-node n-4-127"
                      data-node-id="4:127"
                      data-node-name="Men"
                      data-node-type="TEXT"
                    >
                      Men
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="figma-node n-4-128"
            data-node-id="4:128"
            data-node-name="Footer"
            data-node-type="FRAME"
          >
            <div
              className="figma-node n-4-129"
              data-node-id="4:129"
              data-node-name="Heading â†’ Help"
              data-node-type="TEXT"
            >
              Help
            </div>
            <div
              className="figma-node n-4-130"
              data-node-id="4:130"
              data-node-name="List"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-131"
                data-node-id="4:131"
                data-node-name="Item â†’ Link â†’ Customer Service"
                data-node-type="TEXT"
              >
                Customer Service
              </div>
              <div
                className="figma-node n-4-132"
                data-node-id="4:132"
                data-node-name="Item â†’ Link â†’ FAQs"
                data-node-type="TEXT"
              >
                FAQs
              </div>
              <div
                className="figma-node n-4-133"
                data-node-id="4:133"
                data-node-name="Item â†’ Link â†’ Contact Us"
                data-node-type="TEXT"
              >
                Contact Us
              </div>
              <div
                className="figma-node n-4-134"
                data-node-id="4:134"
                data-node-name="Item â†’ Link â†’ Track Order"
                data-node-type="TEXT"
              >
                Track Order
              </div>
              <div
                className="figma-node n-4-135"
                data-node-id="4:135"
                data-node-name="Item â†’ Link â†’ Returns"
                data-node-type="TEXT"
              >
                Returns
              </div>
              <div
                className="figma-node n-4-136"
                data-node-id="4:136"
                data-node-name="Item â†’ Link â†’ Shipping"
                data-node-type="TEXT"
              >
                Shipping
              </div>
              <div
                className="figma-node n-4-137"
                data-node-id="4:137"
                data-node-name="Item â†’ Link â†’ Accessibility"
                data-node-type="TEXT"
              >
                Accessibility
              </div>
              <div
                className="figma-node n-4-138"
                data-node-id="4:138"
                data-node-name="Item â†’ Button"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-139"
                  data-node-id="4:139"
                  data-node-name="Frame"
                  data-node-type="IMAGE-SVG"
                >
                  <img
                    className="figma-img"
                    alt=""
                    src="/assets/svg_4-139.svg"
                  />
                </div>
                <div
                  className="figma-node n-4-142"
                  data-node-id="4:142"
                  data-node-name="Chat"
                  data-node-type="TEXT"
                >
                  Chat
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-143"
              data-node-id="4:143"
              data-node-name="Link â†’ Promotions"
              data-node-type="TEXT"
            >
              Promotions
            </div>
            <div
              className="figma-node n-4-144"
              data-node-id="4:144"
              data-node-name="Link â†’ Gift Cards"
              data-node-type="TEXT"
            >
              Gift Cards
            </div>
            <div
              className="figma-node n-4-145"
              data-node-id="4:145"
              data-node-name="Link â†’ Stores"
              data-node-type="TEXT"
            >
              Stores
            </div>
            <div
              className="figma-node n-4-146"
              data-node-id="4:146"
              data-node-name="Link â†’ Store Directory"
              data-node-type="TEXT"
            >
              Store Directory
            </div>
            <div
              className="figma-node n-4-147"
              data-node-id="4:147"
              data-node-name='Link - a href="https://www.calvinklein.us/en/preferred-loyalty-program.html"&gt;Preferred Loyalty Program&lt;/a â†’ My Calvin Rewards'
              data-node-type="TEXT"
            >
              My Calvin Rewards
            </div>
            <div
              className="figma-node n-4-148"
              data-node-id="4:148"
              data-node-name="Link â†’ Klarna"
              data-node-type="TEXT"
            >
              Klarna
            </div>
            <div
              className="figma-node n-4-149"
              data-node-id="4:149"
              data-node-name="Link â†’ Cash App Afterpay"
              data-node-type="TEXT"
            >
              Cash App Afterpay
            </div>
            <div
              className="figma-node n-4-150"
              data-node-id="4:150"
              data-node-name="Link â†’ Student and Service Discount"
              data-node-type="TEXT"
            >
              Student and Service Discount
            </div>
            <div
              className="figma-node n-4-151"
              data-node-id="4:151"
              data-node-name="Heading â†’ About"
              data-node-type="TEXT"
            >
              About
            </div>
            <div
              className="figma-node n-4-152"
              data-node-id="4:152"
              data-node-name="List"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-153"
                data-node-id="4:153"
                data-node-name="Item â†’ Link â†’ About Calvin Klein"
                data-node-type="TEXT"
              >
                About Calvin Klein
              </div>
              <div
                className="figma-node n-4-154"
                data-node-id="4:154"
                data-node-name="Item â†’ Link â†’ Careers"
                data-node-type="TEXT"
              >
                Careers
              </div>
              <div
                className="figma-node n-4-155"
                data-node-id="4:155"
                data-node-name="Item â†’ Link â†’ Privacy Commitment"
                data-node-type="TEXT"
              >
                Privacy Commitment
              </div>
              <div
                className="figma-node n-4-156"
                data-node-id="4:156"
                data-node-name="Item â†’ Link â†’ Sustainability + Inclusivity"
                data-node-type="TEXT"
              >
                Sustainability + Inclusivity
              </div>
            </div>
            <div
              className="figma-node n-4-157"
              data-node-id="4:157"
              data-node-name="Heading â†’ Explore"
              data-node-type="TEXT"
            >
              Explore
            </div>
            <div
              className="figma-node n-4-158"
              data-node-id="4:158"
              data-node-name="List"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-159"
                data-node-id="4:159"
                data-node-name="Item â†’ Link â†’ Underwear Guide"
                data-node-type="TEXT"
              >
                Underwear Guide
              </div>
              <div
                className="figma-node n-4-160"
                data-node-id="4:160"
                data-node-name="Item â†’ Link â†’ Denim Fit Guide"
                data-node-type="TEXT"
              >
                Denim Fit Guide
              </div>
              <div
                className="figma-node n-4-161"
                data-node-id="4:161"
                data-node-name="Item â†’ Link â†’ #MYCALVINS"
                data-node-type="TEXT"
              >
                #MYCALVINS
              </div>
              <div
                className="figma-node n-4-162"
                data-node-id="4:162"
                data-node-name="Item â†’ Link â†’ Re-Calvin"
                data-node-type="TEXT"
              >
                Re-Calvin
              </div>
            </div>
            <div
              className="figma-node n-4-163"
              data-node-id="4:163"
              data-node-name="Navigation - Social"
              data-node-type="IMAGE-SVG"
            >
              <img className="figma-img" alt="" src="/assets/svg_4-163.svg" />
            </div>
            <div
              className="figma-node n-4-180"
              data-node-id="4:180"
              data-node-name="SVG"
              data-node-type="IMAGE-SVG"
            >
              <img className="figma-img" alt="" src="/assets/svg_4-180.svg" />
            </div>
            <div
              className="figma-node n-4-183"
              data-node-id="4:183"
              data-node-name="Navigation - legal info"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-184"
                data-node-id="4:184"
                data-node-name="Link - PVH Corp. Joint Modern Slavery Act
          Statement â†’ PVH Corp. Joint Modern Slavery Act Statement"
                data-node-type="TEXT"
              >
                PVH Corp. Joint Modern Slavery Act Statement
              </div>
              <div
                className="figma-node n-4-185"
                data-node-id="4:185"
                data-node-name="Link - Privacy Policy"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-186"
                  data-node-id="4:186"
                  data-node-name="|"
                  data-node-type="TEXT"
                >
                  |
                </div>
                <div
                  className="figma-node n-4-187"
                  data-node-id="4:187"
                  data-node-name="Privacy Policy"
                  data-node-type="TEXT"
                >
                  Privacy Policy
                </div>
              </div>
              <div
                className="figma-node n-4-188"
                data-node-id="4:188"
                data-node-name="Link - Interest Based Ads"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-189"
                  data-node-id="4:189"
                  data-node-name="|"
                  data-node-type="TEXT"
                >
                  |
                </div>
                <div
                  className="figma-node n-4-190"
                  data-node-id="4:190"
                  data-node-name="Interest Based Ads"
                  data-node-type="TEXT"
                >
                  Interest Based Ads
                </div>
              </div>
              <div
                className="figma-node n-4-191"
                data-node-id="4:191"
                data-node-name="Link - Do Not Sell or Share My Personal
          Information"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-192"
                  data-node-id="4:192"
                  data-node-name="|"
                  data-node-type="TEXT"
                >
                  |
                </div>
                <div
                  className="figma-node n-4-193"
                  data-node-id="4:193"
                  data-node-name="Do Not Sell or Share My Personal Information"
                  data-node-type="TEXT"
                >
                  Do Not Sell or Share My Personal Information
                </div>
              </div>
              <div
                className="figma-node n-4-194"
                data-node-id="4:194"
                data-node-name="Link - Terms &amp; Conditions"
                data-node-type="FRAME"
              >
                <div
                  className="figma-node n-4-195"
                  data-node-id="4:195"
                  data-node-name="|"
                  data-node-type="TEXT"
                >
                  |
                </div>
                <div
                  className="figma-node n-4-196"
                  data-node-id="4:196"
                  data-node-name="Terms &amp; Conditions"
                  data-node-type="TEXT"
                >
                  Terms &amp; Conditions
                </div>
              </div>
            </div>
            <div
              className="figma-node n-4-197"
              data-node-id="4:197"
              data-node-name="Web ID: 776309460"
              data-node-type="TEXT"
            >
              Web ID: 776309460
            </div>
            <div
              className="figma-node n-4-198"
              data-node-id="4:198"
              data-node-name="|"
              data-node-type="TEXT"
            >
              |
            </div>
            <div
              className="figma-node n-4-199"
              data-node-id="4:199"
              data-node-name="Copyright Â© 2026 Calvin Klein. All rights reserved."
              data-node-type="TEXT"
            >
              Copyright Â© 2026 Calvin Klein. All rights reserved.
            </div>
            <div
              className="figma-node n-4-200"
              data-node-id="4:200"
              data-node-name="Button"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-4-201"
                data-node-id="4:201"
                data-node-name="Frame"
                data-node-type="IMAGE-SVG"
              >
                <img className="figma-img" alt="" src="/assets/svg_4-201.svg" />
              </div>
              <div
                className="figma-node n-4-205"
                data-node-id="4:205"
                data-node-name="United States"
                data-node-type="TEXT"
              >
                {" "}
                United States
              </div>
            </div>
          </div>
          <div
            className="figma-node n-4-211"
            data-node-id="4:211"
            data-node-name="Header"
            data-node-type="FRAME"
          >
            <div
              className="figma-node n-4-216"
              data-node-id="4:216"
              data-node-name="Nav - Main â†’ List"
              data-node-type="FRAME"
            >
              <div
                className="figma-node n-14-46"
                data-node-id="14:46"
                data-node-name="AV Apparel"
                data-node-type="TEXT"
              >
                AV Apparel
              </div>
              <div
                className="figma-node n-4-217"
                data-node-id="4:217"
                data-node-name="Item â†’ Link â†’ New"
                data-node-type="TEXT"
              >
                New
              </div>
              <div
                className="figma-node n-4-218"
                data-node-id="4:218"
                data-node-name="Item â†’ Link â†’ Women"
                data-node-type="TEXT"
              >
                Women
              </div>
              <div
                className="figma-node n-4-219"
                data-node-id="4:219"
                data-node-name="Item â†’ Link â†’ Men"
                data-node-type="TEXT"
              >
                Men
              </div>
              <div
                className="figma-node n-4-220"
                data-node-id="4:220"
                data-node-name="Item â†’ Link â†’ Underwear"
                data-node-type="TEXT"
              >
                Underwear
              </div>
              <div
                className="figma-node n-4-221"
                data-node-id="4:221"
                data-node-name="Item â†’ Link â†’ Collection"
                data-node-type="TEXT"
              >
                Collection
              </div>
              <div
                className="figma-node n-4-222"
                data-node-id="4:222"
                data-node-name="Item â†’ Link â†’ Kids"
                data-node-type="TEXT"
              >
                Kids
              </div>
              <div
                className="figma-node n-4-223"
                data-node-id="4:223"
                data-node-name="Item â†’ Link â†’ Home"
                data-node-type="TEXT"
              >
                Home
              </div>
              <div
                className="figma-node n-4-224"
                data-node-id="4:224"
                data-node-name="Item â†’ Link â†’ Sale â†’ Sale"
                data-node-type="TEXT"
              >
                Sale
              </div>
            </div>
            <div
              className="figma-node n-4-225"
              data-node-id="4:225"
              data-node-name="Button - search"
              data-node-type="IMAGE-SVG"
            >
              <img className="figma-img" alt="" src="/assets/svg_4-225.svg" />
            </div>
            <div
              className="figma-node n-4-227"
              data-node-id="4:227"
              data-node-name="Button - Account"
              data-node-type="IMAGE-SVG"
            >
              <img className="figma-img" alt="" src="/assets/svg_4-227.svg" />
            </div>
            <div
              className="figma-node n-4-229"
              data-node-id="4:229"
              data-node-name="Button - Cart 0 Items"
              data-node-type="IMAGE-SVG"
            >
              <img className="figma-img" alt="" src="/assets/svg_4-229.svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
