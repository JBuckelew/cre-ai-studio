import React from "react";
import { useParams } from "react-router-dom";
import UseCaseCategoryPage from "@/components/usecases/UseCaseCategoryPage";

export default function UseCaseTaskCategory() {
  const { task } = useParams();
  return <UseCaseCategoryPage type="task" param={task} />;
}