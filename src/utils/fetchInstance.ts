export const fetchInstance = async (
   apiUrl: string,
   idInstance: string,
   apiTokenInstance: string
) => {
   const response = await fetch(
      `${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`
   );

   const data = await response.json();
   console.log(data);

   return data;
};
