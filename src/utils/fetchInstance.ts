export const fetchInstance = async (
   apiUrl: string,
   idInstance: string,
   apiTokenInstance: string
) => {
   try {
      const response = await fetch(
         `${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`
      );

      const data = await response.json();
      return data;
   } catch (e) {
      console.error(e);
   }
};
