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
  const [genreVal, setGenreVal] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [type, setType] = useState<any>("");

  const getAnimeData = async () => {
    await axios
      .get(
        `https://api.jikan.moe/v4/anime?limit=${limit}&page=${page}&genres=${genreVal}&type=${type}&status=${status}&q=${query}`
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
  }, [page, genreVal, limit, status, type]);

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

  return (
    <>
      <div className="flex w-full flex-col h-full space-y-2 max-sm:p-0 py-5">
        <div className="flex  w-full">
          <div className="flex  pl-4 w-full flex-col space-y-1 justify-center">
            <span className="flex space-x-1">
              <ReactSelect
                options={limitValSelect}
                defaultValue={{ value: limit, label: limit }}
                onChange={(e: any) => {
                  console.log(e);
                  setLimit(e?.value);
                }}
                className="w-72"
              ></ReactSelect>
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
            </span>
          </div>
          <div className="flex w-full bg-w">a</div>
        </div>
        <div className="flex w-full flex-wrap items-stretch justify-center space-x-1 space-y-1">
          {animeData?.data?.map((i: any) => {
            return (
              <>
                <span className="relative [&>span]:hover:flex [&>span]:hover:flex-col [&>span]:hover:justify-end">
                  <img
                    alt={i?.titles[0].title}
                    src={i?.images.jpg.image_url}
                    className="w-58 flex h-full"
                  />
                  <span className=" text-center w-full h-full text-white p-1 absolute hidden bg-black bg-opacity-50 left-0 top-0 bottom-0 right-0">
                    {i?.title}
                  </span>
                </span>
              </>
            );
          })}
        </div>
        <div className="flex w-full justify-center space-x-2">
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
    </>
  );
}
