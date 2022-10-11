from copy import copy, deepcopy

# util functions
counter = [0]


def pprint(board):
    for i in range(len(board)):
        print(board[i])


def board_to_pieces(board):
    pieces = []
    for i in range(len(board)):
        for j in range(len(board)):
            if board[i][j] == "Q":
                pieces.append([i, j])
    return pieces


# n_queens related functions
def placeQueen(pos, board, n):
    x = pos[0]
    y = pos[1]
    for i in range(y + 1, n):
        # print(f"({x+i-y}, {i}), ({x-(i-y)},{i})")
        if x + i - y < n:
            board[x + i - y][i] = "x"
        if x - (i - y) >= 0:
            board[x - (i - y)][i] = "x"

    for i in range(y - 1, -1, -1):
        # print(f"({x+i-y}, {i}), ({x-(i-y)},{i})")
        if x + i - y >= 0:
            board[x + i - y][i] = "x"
        if x - (i - y) < n:
            board[x - (i - y)][i] = "x"
    for i in range(n):
        board[pos[0]][i] = "x"
    for j in range(n):
        board[j][pos[1]] = "x"
    board[x][y] = "Q"
    return board


def getNumValidRows(board):
    valid_rows = 0
    i = -1
    for row in board:
        if "." in row:
            valid_rows += 1
    return valid_rows


def backtrack(board, num_q, n, ans, depth):
    valid_rows = getNumValidRows(board)
    if valid_rows < n - num_q:
        return
    # print(
    #     f"{'  '*depth} depth {depth}: qs need to place: {n-num_q} valid_rows: {valid_rows}, {valid_rows < n - num_q}"
    # )
    # pprint(board)
    # print("=============")
    if num_q == n:
        ans.append(board)
        return
    counter[0] += 1
    for i in range(len(board)):
        for j in range(len(board[0])):
            if board[i][j] == ".":
                board_copy = deepcopy(board)
                board = placeQueen((i, j), board, n)
                valid_rows = getNumValidRows(board)
                backtrack(board, num_q + 1, n, ans, depth + 1)
                board_copy[i][j] = "x"
                board = board_copy


def n_queens(size):
    start_board = [["." for x in range(size)] for y in range(size)]
    ans = []
    backtrack(start_board, 0, size, ans, 0)
    return [board_to_pieces(a) for a in ans]


print(f"Solution: {n_queens(4)}")
print("# of times recur has been called =", counter[0])
