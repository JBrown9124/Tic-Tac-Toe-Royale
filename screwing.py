def nested():
    board=[]
    row=[]
    for j in range(5):
            row.append(j)
    for i in range(5):
       
      
        board.append(row)
    return board
if __name__ == "__main__":
    print(nested())