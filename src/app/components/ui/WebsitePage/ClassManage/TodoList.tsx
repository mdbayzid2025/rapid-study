'use client';
import React, { useState } from "react";
import { CheckSquare, Plus, Square } from "lucide-react";

import { TodoItem } from "@/types";
import AddTodoForm from "../../forms/AddTodoForm";
import { useUpdateToDoMutation } from "@/store/api/todosApi";
import { useParams } from "next/navigation";

interface TodoListProps {
  todos: any[];
  items: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, items: initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [updateToDo, {isLoading}] = useUpdateToDoMutation();
  
  

  const toggleItem = async (id: string) => {
    try {
      const data = {status: "Done"}
      const res = await updateToDo({id, data })

      console.log("rtes", res);;
      
    } catch (error) {
      console.log("error", error)
    }
  };

  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
    }
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CheckSquare className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">To-Do List</h3>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
        <div className="space-y-3">
          {todos &&
            todos.map((todos) => (
              <div key={todos?._id} className="flex items-center space-x-3">
                <button
                  onClick={() => toggleItem(todos?._id)}
                  className="flex-shrink-0 cursor-pointer"
                >
                  {todos?.status == "Done" ? (
                    <CheckSquare className="w-5 h-5 text-green-600" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                <span
                  className={`flex-1 ${
                    todos?.status == "Done"
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  {todos?.title}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    todos?.priority
                  )}`}
                >
                  {todos?.priority}
                </span>
              </div>
            ))}
        </div>

        {/* <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <button
              onClick={() => toggleItem(item.id)}
              className="flex-shrink-0"
            >
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-green-600" />
              ) : (
                <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
            <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {item.text}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
              {item.priority}
            </span>
          </div>
        ))}
      </div> */}
      </div>

      <AddTodoForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}        
      />
    </>
  );
};

export default TodoList;
