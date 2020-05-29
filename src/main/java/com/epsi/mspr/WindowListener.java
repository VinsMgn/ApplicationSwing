package com.epsi.mspr;
import java.awt.EventQueue;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.UIManager;
import javax.swing.plaf.nimbus.*;

public class WindowListener {

	private JFrame frame;
	private JButton btnPush = new JButton("Push me");
	private JButton btnClick = new JButton("Click me");
	

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					WindowListener window = new WindowListener();
					UIManager.setLookAndFeel(new NimbusLookAndFeel());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	/**
	 * Create the application.
	 */
	public WindowListener() {
		initialize();
	}
	

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setSize(600,400);
		frame.setTitle("Client Recycl");
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		
		JPanel contentPane = (JPanel)frame.getContentPane();
		contentPane.setLayout(new FlowLayout());
		btnPush.addActionListener( new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				btnPushListener(e);
			}
		});
		contentPane.add(btnPush);

		btnClick.addActionListener( new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				// TODO Auto-generated method stub
				System.out.println("Click me");
			}
		});
		contentPane.add(btnClick);

		contentPane.add(new JCheckBox("Check me"));
		contentPane.add(new JTextField("Edit me"));
	}
	
	private void btnPushListener(ActionEvent e) {
		btnClick.setText("toto");
		System.out.println("Push me");
	}

}
