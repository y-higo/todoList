import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除（関数化）
const deleteFromIncompleteList = (target) => {
  //「未完了のTODOリストから削除」
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する（関数化）
const createIncompleteList = (text) => {
  //追加ボタン押下時のdivの生成
  const div = document.createElement("div");
  div.className = "list-row";

  //追加ボタン押下時のpの生成
  const li = document.createElement("li");
  li.innerText = text;

  //完了ボタン生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押下された完了ボタンの親タグ(div)を削除＝共通化
    deleteFromIncompleteList(completeButton.parentNode);

    //完了リストに追加する要素
    const addTarget = completeButton.parentNode;

    //TODO内容のテキストを取得
    const text = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;

    //完了リストのliタグの生成
    const li = document.createElement("li");
    li.innerText = text;

    //完了リストの戻るボタン（button）タグの生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押下時に完了リストから親タグ(divタグ)を削除する
      //divタグを取得
      const deleteTarget = backButton.parentNode;
      //削除処理
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    //addTargetのdivタグの子要素に各要素を生成していく
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    //完了リストに追加
    //子要素追加取得はappendChild
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //削除ボタン生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押下された削除ボタンの親タグ(div)を削除＝共通化
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  //未完了リストに追加
  //子要素追加取得はappendChild
  document.getElementById("incomplete-list").appendChild(div);

  //divタグの子要素に各要素を設定
  //子要素追加取得はappendChild
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
