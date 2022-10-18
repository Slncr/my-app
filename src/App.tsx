import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import styles from "./App.module.scss";
import { TodoPanel } from "./components/TodoPanel/TodoPanel";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoProvider } from "./utils/contextes/TodoProvider";

export type Todo = {
  id: any;
  name: string;
  description: string;
  checked: boolean;
};

export const App = () => (
  <TodoProvider>
    <div className={styles.app_container}>
      <div className={styles.container}>
        <Header />
        <TodoPanel mode="add" />
        <TodoList />
      </div>
    </div>
  </TodoProvider>
);
