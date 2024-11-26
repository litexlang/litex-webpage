import { useAppSelector } from "@/app/lib/store/hooks";
import { useEffect } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

export default function EnvWatcher() {
  // redux vars
  const env = useAppSelector((state) => state.env.value);

  useEffect(() => {
    console.log(env);
  }, [env]);
  return (
    <SimpleTreeView>
      {env &&
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
        ))}
    </SimpleTreeView>
  );
}
