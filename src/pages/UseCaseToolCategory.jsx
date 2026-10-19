import React from "react";
import { useParams } from "react-router-dom";
import UseCaseCategoryPage from "@/components/usecases/UseCaseCategoryPage";

export default function UseCaseToolCategory() {
  const { tool } = useParams();
  return <UseCaseCategoryPage type="tool" param={tool} />;
}