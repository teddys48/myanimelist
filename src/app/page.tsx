"use client";
import Modal from "@/components/modal";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  limitValSelect,
  orderValSelect,
  ratingValSelect,
  scoreValSelect,
  sfwValSelect,
  sortValSelect,
  statusValSelect,
  typeValSelect,
} from "./helper/selectData";
import moment from "moment";

export default function Home() {
  const [animeData, setAnimeData] = useState<any>([]);
  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<any>(1);
  const [query, setQuery] = useState<any>("");
  const [genre, setGenre] = useState<any>("");
  const [genreVal, setGenreVal] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [sfw, setSfw] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [maxScore, setMaxScore] = useState<string>("");
  const [minScore, setMinScore] = useState<string>("");
  const [animeDetail, setAnimeDetail] = useState<any>([]);
  const [modalStatus, setmodalStatus] = useState<boolean>(false);

  const getAnimeData = async () => {
    await axios
      .get(
        `https://api.jikan.moe/v4/anime?limit=${limit}&page=${page}&genres=${genreVal}&type=${type}&status=${status}&q=${query}&rating=${rating}&sfw=${sfw}&order_by=${orderBy}&sort=${sort}&score=${score}&min_score=${minScore}&max_score=${maxScore}`
      )
      .then((res) => {
        setAnimeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAnimeGenre = async () => {
    await axios
      .get(`https://api.jikan.moe/v4/genres/anime`)
      .then((res) => {
        console.log("cek genre", res.data);
        let dataSelectGenre = [];
        for (const element of res?.data?.data) {
          let data = {
            value: element.mal_id,
            label: element.name,
          };
          dataSelectGenre.push(data);
        }
        setGenre(dataSelectGenre);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAnimeDetail = async (id: string) => {
    await axios
      .get(`https://api.jikan.moe/v4/anime/${id}/full`)
      .then((res) => {
        console.log("cek detail", res.data);
        setAnimeDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  useEffect(() => {
    console.log("cek genreval", genreVal);
    getAnimeData();
  }, [
    page,
    genreVal,
    limit,
    status,
    type,
    rating,
    sfw,
    orderBy,
    sort,
    score,
    minScore,
    maxScore,
    query,
  ]);

  useEffect(() => {
    getAnimeGenre();
  }, []);

  const closeModal = () => {
    setmodalStatus(!modalStatus);
    setAnimeDetail([]);
  };

  const openAnimeDetailModal = () => {};

  const openModalAnimeDetail = async (id: string) => {
    await getAnimeDetail(id);
    setmodalStatus(!modalStatus);
  };

  return (
    <>
      <Modal status={modalStatus} title="" closeModal={() => closeModal()}>
        <div className="flex w-full space-y-10 max-sm:space-y-2 flex-col">
          <div className="flex w-full flex-row max-md:flex-col space-x-2 ">
            <div className="flex justify-center h-full w-full">
              <img
                className="w-auto"
                alt={animeDetail?.data?.title}
                src={animeDetail?.data?.images?.jpg?.large_image_url}
              />
            </div>
            <div className="w-full flex space-y-2 flex-col items-center justify-center">
              <span className="flex w-full justify-center">
                {animeDetail?.data?.title}
              </span>
              <span className="flex w-full px-2 max-md:p-0 space-y-2 text-justify justify-center">
                {animeDetail?.data?.synopsis}
              </span>
            </div>
          </div>
          <div className="flex w-full px-2">
            <table className="table [&>*]:w-auto w-full  ">
              <tr>
                <td>Type</td>
                <td>:</td>
                <td>{animeDetail?.data?.type}</td>
              </tr>
              <tr>
                <td>Source</td>
                <td>:</td>
                <td>{animeDetail?.data?.source}</td>
              </tr>
              <tr>
                <td>Episodes</td>
                <td>:</td>
                <td>{animeDetail?.data?.episodes}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>:</td>
                <td>{animeDetail?.data?.status}</td>
              </tr>
              <tr>
                <td>Aired</td>
                <td>:</td>
                <td>
                  {moment(animeDetail?.data?.aired?.from).format("YYYY-MM-DD")}{" "}
                  to{" "}
                  {animeDetail?.data?.aired?.to
                    ? moment(animeDetail?.data?.aired?.to).format("YYYY-MM-DD")
                    : "-"}
                </td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>:</td>
                <td>{animeDetail?.data?.duration}</td>
              </tr>
              <tr>
                <td>Rating</td>
                <td>:</td>
                <td>{animeDetail?.data?.rating}</td>
              </tr>
              <tr>
                <td>Score</td>
                <td>:</td>
                <td>{animeDetail?.data?.score}</td>
              </tr>
              <tr>
                <td>Studios</td>
                <td>:</td>
                <td>
                  {animeDetail?.data?.studios?.map((i: any) => {
                    return i.name;
                  })}
                </td>
              </tr>
              <tr>
                <td>Genres</td>
                <td>:</td>
                <td>
                  {animeDetail?.data?.genres?.map((i: any) => {
                    return i.name + ", ";
                    // let a = [].push(i.name);
                    // console.log(a)
                    // return a
                  })}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </Modal>
      <div className="w-72 max-h-screen max-sm:max-h-full pt-20 max-sm:hidden max-sm:overflow-hidden overflow-auto flex">
        <div className="flex justify-start w-full flex-col space-y-2 max-sm:hidden max-sm:h-full pl-1">
          <ReactSelect
            isClearable
            placeholder="Genre"
            options={genre}
            isMulti
            className="w-full"
            onChange={(e: any) => {
              console.log(e);
              let data = [];
              for (const element of e) {
                data.push(element?.value);
              }
              console.log("first", data.join());
              setGenreVal(data.join());
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            placeholder="Type"
            options={typeValSelect}
            className="w-full"
            onChange={(e: any) => {
              console.log("status", e);
              if (e) {
                setType(e?.value);
              } else {
                setType("");
              }
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            placeholder="Status"
            options={statusValSelect}
            className="w-full"
            onChange={(e: any) => {
              console.log("status", e);
              if (e) {
                setStatus(e?.value);
              } else {
                setStatus("");
              }
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            placeholder="Rating"
            options={ratingValSelect}
            className="w-full"
            onChange={(e: any) => {
              console.log("rating", e);
              if (e) {
                setRating(e?.value);
              } else {
                setRating("");
              }
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            placeholder="SFW"
            options={sfwValSelect}
            className="w-full"
            onChange={(e: any) => {
              console.log("sfw", e);
              if (e) {
                setSfw(e?.value);
              } else {
                setSfw("");
              }
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            placeholder="Order By"
            options={orderValSelect}
            className="w-full"
            onChange={(e: any) => {
              console.log("order", e);
              if (e) {
                setOrderBy(e?.value);
              } else {
                setOrderBy("");
              }
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            isDisabled={orderBy ? false : true}
            placeholder="Sort"
            options={sortValSelect}
            className={orderBy ? "w-full" : "w-full pointer-events-none"}
            onChange={(e: any) => {
              console.log("order", e);
              if (!orderBy) {
                setSort("");
              }
              if (e) {
                setSort(e?.value);
              } else {
                setSort("");
              }
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            placeholder="Score"
            options={scoreValSelect}
            className="w-full"
            onChange={(e: any) => {
              console.log("score", e);
              if (e) {
                setScore(e?.value);
              } else {
                setScore("");
              }
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            placeholder="Min Score"
            options={scoreValSelect}
            className="w-full"
            onChange={(e: any) => {
              console.log("min score", e);
              if (e) {
                setMinScore(e?.value);
              } else {
                setMinScore("");
              }
            }}
          ></ReactSelect>
          <ReactSelect
            isClearable
            placeholder="Max Score"
            options={scoreValSelect}
            className="w-full"
            onChange={(e: any) => {
              console.log("max score", e);
              if (e) {
                setMaxScore(e?.value);
              } else {
                setMaxScore("");
              }
            }}
          ></ReactSelect>
        </div>
      </div>
      <div className="flex w-full flex-col max-sm:max-h-full max-h-screen space-y-2 max-sm:p-0 pt-5 pb-1">
        <div className="flex w-full max-sm:hidden space-x-2">
          <div className="flex  pl-4 w-full flex-col space-y-1 justify-center">
            <span className="flex w-full justify-start space-x-1 items-baseline">
              <ReactSelect
                options={limitValSelect}
                defaultValue={{ value: limit, label: limit }}
                onChange={(e: any) => {
                  console.log(e);
                  setLimit(e?.value);
                }}
                className="w-24"
              ></ReactSelect>
            </span>
          </div>
          <div className="flex w-full max-sm:flex-wrap items-baseline space-x-4 bg-white pr-5">
            <span>Top</span>
            <span>Recommendation</span>
            <span className="flex flex-wrap justify-start">
              <input
                type="text"
                className="border-2 p-1"
                onChange={(e) => {
                  setTimeout(() => {
                    setQuery(e.target.value);
                  }, 1000);
                }}
                placeholder="Search..."
              />
            </span>
          </div>
        </div>
        <div className="flex cursor-pointer w-full max-sm:max-h-full max-h-screen overflow-auto flex-wrap flex-row items-stretch justify-center flex-grow space-x-1 space-y-1">
          {animeData?.data?.map((i: any) => {
            return (
              <>
                <span
                  onClick={() => openModalAnimeDetail(i?.mal_id)}
                  className="relative [&>span]:hover:flex [&>span]:hover:flex-col [&>span]:hover:justify-end"
                >
                  <img
                    alt={i?.titles[0].title}
                    src={i?.images.jpg.image_url}
                    className="w-48 max-sm:w-36 flex h-full"
                  />
                  <span className=" text-center w-full h-full text-white p-1 absolute hidden bg-black bg-opacity-50 left-0 top-0 bottom-0 right-0">
                    {i?.title}
                  </span>
                </span>
              </>
            );
          })}
          <div className="flex w-full justify-center py-2 items-baseline space-x-2">
            <button
              className={
                animeData?.pagination?.current_page == 1
                  ? "text-gray-400 pointer-events-none"
                  : ""
              }
              onClick={() => setPage(page - 1)}
            >
              previous
            </button>
            <button
              className={
                animeData?.pagination?.current_page == 1
                  ? "text-gray-400 pointer-events-none"
                  : ""
              }
              onClick={() => setPage(1)}
            >
              first
            </button>
            <span>{animeData?.pagination?.current_page}</span>
            <button
              className=""
              onClick={() => setPage(animeData?.pagination?.last_visible_page)}
            >
              last
            </button>
            <button className="" onClick={() => setPage(page + 1)}>
              next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
