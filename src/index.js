import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // divタグを生成する
  const div = document.createElement("div");
  div.className = "list-row";

  //　　pタグを生成する
  const p = document.createElement("p");
  p.innerText = text;

  // button（完了）タグを生成する
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ（div）の親タグ（li）を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode.parentNode);
    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode.parentNode;
    // TODO内容テキストを取得
    const text = addTarget.firstElementChild.firstElementChild.innerText;
    // div以下を初期化
    addTarget.firstElementChild.textContent = null;

    // 追加要素（addTarget）の中身を生成
    const p = document.createElement("p");
    p.innerText = text;
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    // 戻すボタンのクリックイベントを設定
    backButton.addEventListener("click", () => {
      // 戻す要素（backTarget）を取得
      const backTarget = backButton.parentNode.parentNode;
      // 戻す要素（backTarget）を完了リストから削除
      document.getElementById("complete-list").removeChild(backTarget);
      // TODO内容テキストを取得
      const text = backTarget.firstElementChild.firstElementChild.innerText;
      // 未完了リストに追加する
      createIncompleteList(text);
    });

    addTarget.firstElementChild.appendChild(p);
    addTarget.firstElementChild.appendChild(backButton);

    // 追加要素（addTarget）を完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button（削除）タグを生成する
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ（div）の親タグ（li）を　未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode.parentNode);
  });

  // divタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // liタグを生成する
  const li = document.createElement("li");

  // liタグの子要素にdivタグを設定
  li.appendChild(div);

  // ulタグの子要素にliタグを設定（未完了リストに追加）
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
