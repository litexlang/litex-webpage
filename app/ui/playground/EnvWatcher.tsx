import { useAppSelector } from "@/app/lib/browser/store/hooks";
import { useEffect } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Typography } from "@mui/material";

export default function EnvWatcher() {
  // redux vars
  const env = useAppSelector((state) => state.env.value);

  const watchedEnvTypes = ["concepts", "facts", "operators", "singletonVars"]

  useEffect(() => {
    console.log(env);
  }, [env]);
  return (
    // concepts Map
    // facts Map
    // operators Map
    // singletonVars Set
    <Box>
      <Typography variant="subtitle2">Env Watcher</Typography>
      <SimpleTreeView>
        {/* {env &&
          Object.keys(env).map((key, index) => (
            <TreeItem itemId={"env-" + index} label={key}>
              {Array.isArray(env[key])
                ? env[key].map((subitem, subindex) => (
                  <TreeItem
                    itemId={"item-" + key + "-" + subindex}
                    label={subitem.toString()}
                  ></TreeItem>
                ))
                : Object.keys(env[key]).map((subkey, subindex) => (
                  <TreeItem
                    itemId={"item-" + key + "-" + subindex}
                    label={JSON.stringify(env[key][subkey])}
                  ></TreeItem>
                ))}
            </TreeItem>
          ))} */}
      </SimpleTreeView>

    </Box>
  );
}
