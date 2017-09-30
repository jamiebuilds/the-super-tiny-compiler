type token =
  | OpenParen
  | CloseParen
  | Number string
  | String string
  | Name string;

type tokenMachine = {
  current: option token,
  parsed: list token
};

let machine = {current: None, parsed: []};

let explode s => {
  let rec exp i l =>
    if (i < 0) {
      l
    } else {
      exp (i - 1) [s.[i], ...l]
    };
  exp (String.length s - 1) []
};

let tokenizer input => {
  let rec tok input current tokens =>
    switch input {
    | [] => List.rev tokens
    | _ =>
      let head = List.hd input;
      let tail = List.tl input;
      let next = tok tail;
      switch (head, current, tokens) {
      /* State: None */
      | ('(', None, t) => next None [OpenParen, ...t]
      | (')', None, t) => next None [CloseParen, ...t]
      | (' ' | '\t' | '\r' | '\n', None, t) => next None t
      | ('"', None, t) => next (Some (String "")) t
      | ('0'..'9' as i, None, t) => next (Some (Number (String.make 1 i))) t
      | ('a'..'z' as i, None, t) => next (Some (Name (String.make 1 i))) t
      /* State: String */
      | ('"', Some (String c), t) => next None [String c, ...t] /* TODO allow escaped double quotes :) */
      | (i, Some (String c), t) => next (Some (String (c ^ String.make 1 i))) t
      /* State: Number */
      | ('0'..'9' as i, Some (Number c), t) => next (Some (Number (c ^ String.make 1 i))) t
      | (')', Some (Number c), t) => next None [CloseParen, Number c, ...t]
      | (' ', Some (Number c), t) => next None [Number c, ...t]
      /* State: Name */
      | ('a'..'z' as i, Some (Name c), t) => next (Some (Name (c ^ String.make 1 i))) t
      | (')', Some (Name c), t) => next None [CloseParen, Name c, ...t]
      | (' ', Some (Name c), t) => next None [Name c, ...t]
      /* Errors */
      | (_, _, t) => List.rev t /* TODO: handle errors */
      }
    };
  tok (explode input) machine.current machine.parsed
};

let printToken token =>
  switch token {
  | OpenParen => "OpenParen"
  | CloseParen => "CloseParen"
  | Number s => "Number " ^ s
  | String s => "String " ^ s
  | Name s => "Name " ^ s
  };

List.iter (fun k => Js.log (printToken k)) (tokenizer "(add 2 (subtract 4 2))");