"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

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
  ]);

  useEffect(() => {
    getAnimeGenre();
  }, []);

  const limitValSelect = [
    {
      value: 5,
      label: 5,
    },
    {
      value: 10,
      label: 10,
    },
    {
      value: 20,
      label: 20,
    },
  ];

  const statusValSelect = [
    {
      value: "airing",
      label: "Airing",
    },
    {
      value: "complete",
      label: "Complete",
    },
    {
      value: "upcoming",
      label: "Upcoming",
    },
  ];

  const typeValSelect = [
    {
      value: "tv",
      label: "TV",
    },
    {
      value: "movie",
      label: "Movie",
    },
    {
      value: "ova",
      label: "OVA",
    },
    {
      value: "special",
      label: "Special",
    },
    {
      value: "ona",
      label: "ONA",
    },
    {
      value: "music",
      label: "Music",
    },
    {
      value: "cm",
      label: "CM",
    },
    {
      value: "pv",
      label: "PV",
    },
    {
      value: "tv_special",
      label: "TV Special",
    },
  ];

  const ratingValSelect = [
    {
      value: "g",
      label: "G",
    },
    {
      value: "pg",
      label: "PG",
    },
    {
      value: "pg13",
      label: "PG-13",
    },
    {
      value: "r17",
      label: "PG-17+",
    },
    {
      value: "r",
      label: "R+",
    },
    {
      value: "rx",
      label: "Rx",
    },
  ];

  const sfwValSelect = [
    {
      value: "true",
      label: "True",
    },
    {
      value: "false",
      label: "False",
    },
  ];

  const orderValSelect = [
    {
      value: "mal_id",
      label: "ID",
    },
    {
      value: "title",
      label: "Title",
    },
    {
      value: "start_date",
      label: "Start Date",
    },
    {
      value: "end_date",
      label: "End Date",
    },
    {
      value: "episodes",
      label: "Episodes",
    },
    {
      value: "score",
      label: "Score",
    },
    {
      value: "rank",
      label: "Rank",
    },
    {
      value: "popularity",
      label: "Popularity",
    },
  ];

  const sortValSelect = [
    {
      value: "asc",
      label: "Ascending",
    },
    {
      value: "desc",
      label: "Descending",
    },
  ];

  const scoreValSelect = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "6",
      label: "6",
    },
    {
      value: "7",
      label: "7",
    },
    {
      value: "8",
      label: "8",
    },
    {
      value: "9",
      label: "9",
    },
    {
      value: "10",
      label: "10",
    },
  ];

  return (
    <>
      <div className="w-64 max-h-screen pt-20 overflow-auto flex">
        <div className="flex justify-start w-full flex-col space-y-1 pl-1">
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
      <div className="flex w-full flex-col max-h-screen space-y-2 max-sm:p-0 pt-5 pb-1">
        <div className="flex w-full space-x-2">
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
              <div className="flex w-full justify-end items-baseline space-x-2">
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
                  onClick={() =>
                    setPage(animeData?.pagination?.last_visible_page)
                  }
                >
                  last
                </button>
                <button className="" onClick={() => setPage(page + 1)}>
                  next
                </button>
              </div>
            </span>
          </div>
          <div className="flex w-full bg-w">a</div>
        </div>
        <div className="flex w-full max-h-screen overflow-auto flex-wrap flex-row items-stretch justify-center flex-grow space-x-1 space-y-1">
          {animeData?.data?.map((i: any) => {
            return (
              <>
                <span className="relative [&>span]:hover:flex [&>span]:hover:flex-col [&>span]:hover:justify-end">
                  <img
                    alt={i?.titles[0].title}
                    src={i?.images.jpg.image_url}
                    className="w-48 flex h-full"
                  />
                  <span className=" text-center w-full h-full text-white p-1 absolute hidden bg-black bg-opacity-50 left-0 top-0 bottom-0 right-0">
                    {i?.title}
                  </span>
                </span>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
