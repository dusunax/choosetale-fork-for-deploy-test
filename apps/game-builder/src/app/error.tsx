"use client";
import React from "react";
import type { NextPageContext } from "next";
import LinkedButton from "@/components/common/button/LinkedButton";

interface ErrorPageProps {
  statusCode: number;
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 text-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Error</h1>
        <h2 className="text-2xl font-semibold mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "Something went wrong 🥲"}
        </h2>
        <p className="text-lg mb-8">
          예상치 못한 오류가 발생했습니다. <br />
          잠시 후 다시 시도해 주세요.
        </p>
        <div className="flex gap-2 justify-center">
          <LinkedButton to=".." buttonText="뒤로 가기" variant="outline" />
          <LinkedButton to="/" buttonText="메인으로" />
        </div>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err ? err?.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
