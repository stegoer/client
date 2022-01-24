import { useMutation, useQuery } from "@apollo/client/react/hooks";
import { createImage, images } from "../graphql/image/image.model";
import { Images, ImagesVariables } from "../graphql/image/interfaces/Images";
import {
  CreateImage,
  CreateImageVariables,
} from "../graphql/image/interfaces/CreateImage";

export const useImages = (variables: ImagesVariables) => {
  const { data, loading, error } = useQuery<Images, ImagesVariables>(images, {
    variables,
  });
  return { data: data?.images, loading, error };
};

export const useCreateImage = (variables?: CreateImageVariables) => {
  return useMutation<CreateImage, CreateImageVariables>(createImage, {
    variables,
  });
};