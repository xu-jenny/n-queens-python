from copy import copy, deepcopy

def replaceCharAtIndex(s, char, idx):
    return s[:idx] + char + s[idx + 1:]

def markDiagonal(row, col, board, n):
    i = row
    j = col

    while i < n and j < n:
        board[i][j] = 'x'
        i += 1
        j += 1

    i = row
    j = col
    while i > -1 and j < n:
        board[i][j] = 'x'
        i -= 1
        j += 1

    i = row
    j = col
    while i < n and j > -1:
        board[i][j] = 'x'
        i += 1
        j -= 1

    i = row
    j = col
    while i > -1 and j > -1:
        board[i][j] = 'x'
        i -= 1
        j -= 1

    return board

def placeQueen(pos, board, n):
    for i in range(n):
        board[pos[0]][i] = 'x'
    for j in range(n):
        board[j][pos[1]] = 'x'
    temp =  markDiagonal(pos[0], pos[1], board, n)
    temp[pos[0]][pos[1]] = 'Q'
    return temp

def getNumValidRows(board):
    valid_rows = 0
    i = -1
    while i < len(board):
        if('.' in board[i]):
            valid_rows += 1
        i += 1

    return valid_rows

def backtrack(board, num_q, valid_rows, n, ans, depth):
    # print(f"{'  '*depth} depth {depth}: qs need to place: {n-num_q} valid_rows: {valid_rows}")
    # pprint(board)
    # print("=============")
    if(valid_rows < n-num_q):
        return
    if num_q == n:
        ans.append(board)
        return
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == '.':
                board_copy = deepcopy(board)
                board = placeQueen((i, j), board, n)
                backtrack(board, num_q+1, getNumValidRows(board), n, ans, depth+1)
                board_copy[i][j] = 'x'
                board = board_copy
                j += 1

def pprint(board):
    for i in range(len(board)):
        print(board[i])

for i in range(8, 9):
    start_board = []
    for j in range(i):
        start_board.append([])
        for k in range(i):
            start_board[j].append('.')
    ans = []
    backtrack(start_board, 0,i, i, ans, 0)
    print(i, len(ans))
