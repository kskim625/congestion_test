import { useState, useEffect, useCallback } from "react";

const KtApiTest = () => {
  const [ktCategoryData, setKtCategoryData] = useState<
    { [key: string]: string }[]
  >([]);
  const [ktHotspotData, setKtHotspotData] = useState<
    { [key: string]: string }[]
  >([]);

  const initKtCategoryData = useCallback(async () => {
    const page1Data = await (
      await fetch(
        "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=1&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=15&sort=true"
      )
    ).json();
    const page2Data = await (
      await fetch(
        "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=2&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=15&sort=true"
      )
    ).json();
    const page3Data = await (
      await fetch(
        "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=3&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=15&sort=true"
      )
    ).json();
    const page4Data = await (
      await fetch(
        "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=4&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=15&sort=true"
      )
    ).json();
    setKtCategoryData([
      ...page1Data.row,
      ...page2Data.row,
      ...page3Data.row,
      ...page4Data.row,
    ]);
  }, []);

  const initKtHotspotData = useCallback(async () => {
    const hotspotData = await (
      await fetch("https://data.seoul.go.kr/SeoulRtd/json/hotspot.json")
    ).json();
    setKtHotspotData([...hotspotData.features]);
  }, []);

  useEffect(() => {
    initKtCategoryData();
    initKtHotspotData();
  }, [initKtCategoryData]);

  return (
    <div>
      <span>
        {
          'endpoint: "http://openapi.seoul.go.kr:8088/(인증키)/xml/citydata/1/5/${hotspotName(한글)}"'
        }
      </span>

      <br />
      <span>
        {
          'endpoint: "https://data.seoul.go.kr/SeoulRtd/pop_congest?hotspotNm=${hotspotName(한글)}"'
        }
      </span>

      <br />
      <h1>KT - Category List</h1>
      <span>
        {
          'endpoint: "https://data.seoul.go.kr/SeoulRtd/getCategoryList?page=${pageNumber}&category=%EC%A0%84%EC%B2%B4%EB%B3%B4%EA%B8%B0&count=15&sort=true"'
        }
      </span>
      {ktCategoryData.map((data: { [key: string]: string }) => (
        <div>
          <br />
          <div>{`카테고리: ${data.category}`}</div>
          <div>{`색: ${data.congestion_color}`}</div>
          <div>{`혼잡여부: ${data.area_congest_lvl}`}</div>
          <div>{`혼잡도 점수: ${data.area_congestion}`}</div>
          <div>{`장소 이름: ${data.area_nm}`}</div>
        </div>
      ))}
      <br />
      <h1>KT - hotspot List</h1>
      <span>
        {'endpoint: "https://data.seoul.go.kr/SeoulRtd/json/hotspot.json"'}
      </span>
      {ktHotspotData.map((data: { [key: string]: string }) => (
        <div>
          <br />
          <div>{`카테고리: ${data.category}`}</div>
          <div>{`색: ${data.color}`}</div>
          <div>{`hotspot 이름: ${data.hotspotNm}`}</div>
        </div>
      ))}
    </div>
  );
};

export default KtApiTest;
