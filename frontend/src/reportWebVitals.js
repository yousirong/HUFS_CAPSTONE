/**
 * https://www.npmjs.com/package/web-vitals
 * web-vitals라이브러리는 실제 사용자에 대한 모든 Web Vitals 측정항목을 측정하기 위한 작은(~1K)
 *  모듈식 라이브러리로 , Chrome 에서 측정하고
 * 다른 Google 도구(예: Chrome 사용자 경험 보고서 , 페이지 )
 * 에 보고하는 방식과 정확하게 일치합니다.
 * (Speed Insights , Search Console의 속도 보고서 ).
 * chrome analytics에 보내서 볼지 말기 아직 안정함.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
