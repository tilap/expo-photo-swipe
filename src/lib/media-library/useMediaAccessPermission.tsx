import { usePermissions } from "expo-media-library";
import { useEffect, useState } from "react";

type Access = "all" | "limited" | "none" | false;

type UseMediaAccessPermission = { access?: Access; loading: boolean };

export function useMediaAccessPermission(): UseMediaAccessPermission {
  const [access, setAccess] = useState<"all" | "limited" | "none" | false | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] = usePermissions();

  useEffect(() => {
    Promise.resolve().then(() => {
      if (!mediaLibraryPermissionResponse) {
        return null;
      }
      if (mediaLibraryPermissionResponse.status === "granted") {
        setAccess(mediaLibraryPermissionResponse?.accessPrivileges);
        setLoading(false);
        return;
      }
      if (!mediaLibraryPermissionResponse.canAskAgain) {
        setAccess(false);
        setLoading(false);
        return;
      }
      requestMediaLibraryPermission();
    });
  }, [mediaLibraryPermissionResponse, requestMediaLibraryPermission]);

  return { access, loading };
}
