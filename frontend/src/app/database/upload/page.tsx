import UploadWrapper from "@/components/FileUpload/upload"; // ✅ Uses the Client Component


export default async function UploadPage() {
    
  
  
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-7">
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">File Upload</h2>
          <UploadWrapper />
        </div>
      </div>
    </>
  );
}