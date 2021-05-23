import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageReturnButton from "../../components/atoms/share/PageReturnButton";
import SeparateHr from "../../components/atoms/share/SeparateHr";
import Layout from "../../components/Layout";
import PresentationFormCard from "../../components/organisms/presentation/PresentationFormCard";
import { fetchPresentation } from "../../services/Presentation";

const PresentationEditArea: React.FC = () => {
  return (
    <Layout title="">
      <div className="flex justify-center m-5">
        <PresentationFormCard isEditPage={true} accountInfo={{}} />
      </div>

      <SeparateHr />
      <PageReturnButton />
    </Layout>
  );
};

export default PresentationEditArea;
