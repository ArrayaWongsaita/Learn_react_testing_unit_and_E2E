import axios from "axios";
import { useEffect, useState } from "react";

export default function Tags() {
  const [tags, setTags] = useState([]);
  console.log("tags", tags);


  useEffect(() => {
    console.log("useEffect");
    axios.get("http://localhost:3001/tags").then((response) => {
      setTags(response.data);
      console.log("response = ",response.data);
    });
  }, []);

  return (
    <div data-testid="tags">
      {tags.length > 0 ? tags.map(tag => tag.name).join(', ') : 'No tags available'}
    </div>
  );
}
