import React, { FC, useEffect, useState } from "react";
import styles from "../styles/Song.module.css";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

interface SongProps {
}
const Song: FC<SongProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <div>
        <h1>Song {id}</h1>
      </div>
    </Layout>
  );
};

export default Song;
